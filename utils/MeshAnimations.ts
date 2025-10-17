import { Mesh, Object3D } from 'three';
import { gsap } from 'gsap';
import { ANIMATION_DURATION } from '../constants/ModelSwitcherConstants';

export const fadeMeshes = (group: Object3D | null | undefined, opacity: number) => {
    if (!group) return;
    group.traverse((child) => {
        if (child instanceof Mesh) {
            const material = child.material;
            material.transparent = true;
            gsap.to(material, { opacity: opacity, duration: ANIMATION_DURATION });
        }
    });
}

export const moveGroup = (group: Object3D | null | undefined, x: number ) => {
    if (!group) return;
    gsap.to(group.position, { x, duration: ANIMATION_DURATION})
}