"use client"
import { PresentationControls } from '@react-three/drei';
import { useRef } from 'react'
import type { Mesh } from 'three';
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import { useGSAP } from '@gsap/react';
import { fadeMeshes, moveGroup } from '@/utils/MeshAnimations';
import { OFFSET_DISTANCE } from '@/constants/ModelSwitcherConstants';

const ModelSwitcher = ({scale, isMobile}: {scale: number, isMobile?: boolean})=>{
    const smallMacbookRef = useRef<Mesh | null>(null);
    const largeMacbookRef = useRef<Mesh | null>(null);

    const showlargeMacbook = scale === 0.08  || scale === 0.05;

    useGSAP(() => {
        if( !showlargeMacbook ){
       moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
       moveGroup(largeMacbookRef.current, 0);

       fadeMeshes(smallMacbookRef.current, 0);
       fadeMeshes(largeMacbookRef.current, 1);
        }else{
       moveGroup(smallMacbookRef.current, 0);
       moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

       fadeMeshes(smallMacbookRef.current, 1);
       fadeMeshes(largeMacbookRef.current, 0);
        }
    }, [scale])
    
    const controlsConfig = {
        snap: true,
        speed: 1.2,
        zoom: 1.4,
        config: { mass: 1, tension: 0, friction: 20}

    }
  return (
    <>
     <PresentationControls  {...controlsConfig}>
        <group ref={largeMacbookRef}>
            <MacbookModel16 
            scale={isMobile ? 0.05 : 0.08}
            />
        </group>
     </PresentationControls>
     <PresentationControls  {...controlsConfig}>
        <group ref={smallMacbookRef}>
            <MacbookModel14
            scale={isMobile ? 0.05 : 0.06}
            />
        </group>
     </PresentationControls>
    </>

  )
}

export default ModelSwitcher