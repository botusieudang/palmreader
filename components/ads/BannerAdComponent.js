import { useEffect, useState } from "react";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADS_UNIT } from "./AdManager";

export default function BannerAdComponent(props) {
  const {
    adUnitId = ADS_UNIT.BANNER_HOME,
    size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
  } = props;

  const [isVip, setIsVip] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("palm_reader_vip").then((v) => {
      if (v === "true") setIsVip(true);
    }).catch(() => {});
  }, []);

  if (isVip) return null;

  return (
    <BannerAd
      unitId={adUnitId || ADS_UNIT.BANNER_HOME}
      size={size || BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      onAdLoaded={() => console.log("Banner ad loaded")}
      onAdFailedToLoad={(error) => console.log("Banner ad failed to load", error)}
    />
  );
}
