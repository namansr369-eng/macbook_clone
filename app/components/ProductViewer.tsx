"use client"

import useMacbookStore from "../../store/useMacbookStore";
import {clsx} from "clsx";
import { Canvas } from "@react-three/fiber";
import StudioLight from "./three/StudioLight";
import ModelSwitcher from "./three/ModelSwitcher";
import { useMediaQuery } from "react-responsive";

type MacbookStore = {
    color: string;
    scale: number;
    setColor: (color: string) => void;
    setScale: (scale: number) => void;
};

const ProductViewer = () => {
    const { color, scale, setColor, setScale } = useMacbookStore() as MacbookStore;
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    return (
        <section id="product-viewer">
            <h2>Take a closer look.</h2>

            <div className="controls">
                <div className="flex-center gap-5 mt-5">
                    <div className="color-control">
                        <div 
                        onClick={()=> setColor('#adb5bd')}
                        className={clsx(`bg-neutral-300`, color === "#adb5bd" && "active")} />
                        <div 
                        onClick={()=> setColor('#171717')}
                        className={clsx(`bg-neutral-900`, color === "#171717" && "active")} />
                    </div>

                    <div className="size-control">
                        <div
                        onClick={() => setScale(0.08)}
                        className={clsx(scale === 0.08 && "active")}
                        >
                            <p>14*</p>
                        </div>
                        <div
                        onClick={() => setScale(0.1)}
                        className={clsx(scale === 0.1 && "active")}
                        >
                            <p>16*</p>
                        </div>
                    </div>
                </div>
            </div>

            <Canvas id="canvas" camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100}}>
                <StudioLight />
                <ModelSwitcher scale={ isMobile ? 0.03 : scale } isMobile={isMobile} />
            </Canvas>
        </section>
    )
}

export default ProductViewer