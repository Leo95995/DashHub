import { MOBILE, TABLET } from "../data/media-queries";
import type { ScreenMode } from "../interfaces/common/interfaces";

export const isMobile = (screenWidth: number) => {
    return screenWidth <= MOBILE
}

export const isTablet = (screenWidth: number): boolean=> {
    return screenWidth <  TABLET && screenWidth > MOBILE
}
export const isDesktop = (screenWidth :number) :boolean => {
   return screenWidth >= TABLET
}

export const getCurrentMode = (screenWidth: number) : ScreenMode => {

    if(screenWidth >=  TABLET){
        return 'desktop'
    }else if(screenWidth < TABLET && screenWidth > MOBILE){
        return 'tablet'
    }else if(screenWidth <= MOBILE){
        return 'mobile';
    }else { 
        return "desktop"
    }
}