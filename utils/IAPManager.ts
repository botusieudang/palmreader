import { Alert, Platform, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchProducts,
  finishTransaction,
  getAvailablePurchases,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
  type Product,
  type Purchase,
  type Subscription,
} from "react-native-iap";

// Product IDs cho Google Play Store và App Store
// THAY ĐỔI CÁC ID NÀY THÀNH ID THỰC TẾ TRONG GOOGLE PLAY CONSOLE
export const IAP_PRODUCTS = {
  // One-time purchases
  IAP_LIFETIME: Platform.select({
    android: "palmreader.lifetime",
  }),

  // Subscriptions
  SUBSCRIPTION: Platform.select({
    android: "palmreader.premium",
  }),
};

// Cấu hình subscription
export const SUBSCRIPTION_IDS = [IAP_PRODUCTS.SUBSCRIPTION].filter(
  Boolean,
) as string[];

// Cấu hình one-time purchase
export const ONE_TIME_PURCHASE_IDS = [IAP_PRODUCTS.IAP_LIFETIME].filter(
  Boolean,
) as string[];

class IAPManager {
  private static instance: IAPManager;
  private inappLeftTime: Product[] = [];
  private subscriptions: Subscription[] = [];
  private isInitialized = false;
  private isVip = false;
  private ownedProductIds: Set<string> = new Set();
  private vipListeners: Set<(isVip: boolean) => void> = new Set();

  private constructor() {}

  public static getInstance(): IAPManager {
    if (!IAPManager.instance) {
      IAPManager.instance = new IAPManager();
    }
    return IAPManager.instance;
  }

  // Khởi tạo IAP
  public async initialize(): Promise<boolean> {
    try {
      console.log("🚀 Initializing IAP...");
      const result = await initConnection();

      if (result) {
        console.log("✅ IAP initialized successfully");
        this.isInitialized = true;

        // Load in-app và subscriptions
        await this.loadInApp();
        await this.loadSubscriptions();

        // Setup listeners
        this.setupListeners();

        return true;
      }
      return false;
    } catch (error) {
      console.error("❌ IAP initialization error:", error);
      return false;
    }
  }

  // Load products (one-time purchases)
  private async loadInApp(): Promise<void> {
    try {
      if (ONE_TIME_PURCHASE_IDS.length > 0) {
        const result = await fetchProducts({
          skus: ONE_TIME_PURCHASE_IDS,
          type: "in-app",
        });
        this.inappLeftTime = (result as unknown as Product[]) || [];
      }
    } catch (error) {
      this.inappLeftTime = [];
    }
  }

  // Load subscriptions
  private async loadSubscriptions(): Promise<void> {
    try {
      if (SUBSCRIPTION_IDS.length > 0) {
        console.log("📋 Loading subscriptions with IDs:", SUBSCRIPTION_IDS);
        const result = await fetchProducts({
          skus: SUBSCRIPTION_IDS,
          type: "subs",
        });
        // Cast to unknown first, then to Subscription[]
        this.subscriptions = (result as unknown as Subscription[]) || [];
      }
    } catch (error) {
      this.subscriptions = [];
    }
  }

  // Setup purchase listeners
  private setupListeners(): void {
    // Purchase updated listener
    purchaseUpdatedListener((purchase: Purchase) => {
      this.handlePurchaseUpdate(purchase);
    });

    // Purchase error listener
    purchaseErrorListener((error: any) => {
      if (
        error.code === "already-owned" ||
        error.code === "ITEM_ALREADY_OWNED" ||
        error.responseCode === 7
      ) {
        console.log("ℹ️ Item already owned");
      } else if (
        error.code === "USER_CANCELED" ||
        error.code === "user-canceled" ||
        error.responseCode === 1
      ) {
        console.log("ℹ️ User canceled purchase");
      } else if (
        error.code === "ITEM_UNAVAILABLE" ||
        error.code === "item-unavailable" ||
        error.responseCode === 4
      ) {
        console.log("❌ Item not available for purchase");
      } else {
        console.log("❌ Unknown purchase error:", error);
      }
    });
  }

  // Handle purchase update
  private async handlePurchaseUpdate(purchase: Purchase): Promise<void> {
    try {
      await this.processPurchaseReward(purchase);

      // Check if it's a one-time purchase (consumable) or subscription
      const isOneTimePurchase = ONE_TIME_PURCHASE_IDS.includes(
        purchase.productId,
      );
      if (isOneTimePurchase) {
        // Nêu isConsumable là true thì cho mua lại nhiều lần - false thì chỉ cho mua 1 lần
        await finishTransaction({ purchase, isConsumable: false });
      } else {
        await finishTransaction({ purchase, isConsumable: true });
      }
    } catch (error) {
      console.log("❌ Error processing transaction:", error);
    }
  }

  // Process purchase reward
  private async processPurchaseReward(purchase: Purchase): Promise<void> {
    try {
      console.log("🎉 Purchase success");
      this.setIsVip(true);
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "🎉 Mua VIP thành công! Quảng cáo đã được tắt.",
          ToastAndroid.LONG,
        );
      } else {
        Alert.alert(
          "Thành công",
          "🎉 Mua VIP thành công! Quảng cáo đã được tắt.",
        );
      }
    } catch (error) {
      console.log("❌ Error processing reward:", error);
    }
  }

  // Get all products
  public getInApp(): Product[] {
    return this.inappLeftTime;
  }

  // Get all subscriptions
  public getSubscriptions(): Subscription[] {
    return this.subscriptions;
  }

  public getIsVip(): boolean {
    return this.isVip;
  }

  private setIsVip(value: boolean): void {
    if (this.isVip !== value) {
      this.isVip = value;
      AsyncStorage.setItem("palm_reader_vip", value ? "true" : "false").catch(() => {});
      this.vipListeners.forEach((listener) => listener(value));
    }
  }

  public addVipListener(listener: (isVip: boolean) => void): () => void {
    this.vipListeners.add(listener);
    return () => this.vipListeners.delete(listener);
  }

  public isLifetimeOwned(): boolean {
    return this.ownedProductIds.has(IAP_PRODUCTS.IAP_LIFETIME as string);
  }

  // Check if the user has any purchases and update the isVip status
  public async refreshEntitlements(): Promise<void> {
    try {
      const purchases = await getAvailablePurchases();
      // isVip nếu có lifetime hoặc có sub trong danh sách
      this.ownedProductIds = new Set((purchases || []).map((p) => p.productId));
      this.setIsVip(purchases.length > 0);
    } catch (e) {
      console.log("❌ refreshEntitlements error:", e);
    }
  }

  public async requestPurchaseWithOffer(
    productId: string,
    offerToken: string,
    basePlanId?: string,
  ): Promise<void> {
    return this.purchase(productId, { offerToken, isOfferPersonalized: false });
  }

  // Request purchase (event-based)
  public async requestPurchase(
    productId: string,
    basePlanId?: string,
  ): Promise<void> {
    return this.purchase(productId, { isOfferPersonalized: false });
  }

  // Unified purchase method
  public async purchase(
    productId: string,
    options?: { offerToken?: string; isOfferPersonalized?: boolean },
  ): Promise<void> {
    try {
      if (!this.isInitialized) {
        console.error("❌ IAP not initialized");
        return;
      }
      // const owned = await getAvailablePurchases();
      // console.log('🔍 Owned:', owned);
      // if (owned.length > 0) {
      //   await consumePurchase(owned[0].purchaseToken as string);
      // }
      const isOfferPersonalized = options?.isOfferPersonalized ?? false;
      const offerToken = options?.offerToken;
      const isSubscription =
        !!offerToken || SUBSCRIPTION_IDS.includes(productId);

      if (isSubscription) {
        const androidReq: any = {
          skus: [productId],
          isOfferPersonalized,
        };
        if (offerToken) {
          androidReq.subscriptionOffers = [{ sku: productId, offerToken }];
        }
        const requestParams: any = {
          request: {
            android: androidReq,
          },
          type: "subs",
        };
        console.log("📦 Purchase params:", JSON.stringify(requestParams));
        requestPurchase(requestParams);
      } else {
        const requestParams: any = {
          request: {
            android: {
              skus: [productId],
              isOfferPersonalized,
            },
          },
          type: "in-app",
        };
        requestPurchase(requestParams);
      }
    } catch (error) {
      console.error("❌ Purchase request failed:", error);
    }
  }

  // Check if initialized
  public isReady(): boolean {
    return this.isInitialized;
  }

  // Get all available items (products + subscriptions)
  public getAllItems(): (Product | Subscription)[] {
    return [...this.inappLeftTime, ...this.subscriptions];
  }

  // Log all available items
  public logAllItems(): void {
    console.log("📦 All In-App:", this.inappLeftTime);
    console.log("📋 All Subscriptions:", this.subscriptions);
    console.log("🛍️ All Items:", this.getAllItems());
    console.log(JSON.stringify(this.getAllItems()));
  }
}

export default IAPManager;
