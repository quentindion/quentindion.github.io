import { useRef } from "react";
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

export default function LottieIcon ({animationData}: {animationData: unknown}) {
        
    const lottieRef = useRef<LottieRefCurrentProps | null>(null);

    const onMouseEnter = () => {
        lottieRef.current?.setDirection(1);
        lottieRef.current?.play();
    }

    const onMouseLeave = () => {
        lottieRef.current?.setDirection(-1);
        lottieRef.current?.play();
    }

    return <Lottie lottieRef={lottieRef} animationData={animationData} loop={false} autoplay={false}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="lottie lottie-icon" />
}