"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    console.log("videoElement:", videoElement?.readyState || "null")
    if (videoElement) {
      const handleMetadata =  () => {
        try {
          videoElement.playbackRate = 2.5; // Set speed first
           videoElement.play(); // Then play manually
        } catch (err) {
          console.warn("Autoplay failed:", err);
        }
      };
      
      //this approach is robust enough to handle both cached and non-cached video loads but not necessary in my case here.
      // If metadata already loaded (cached video) 
      if (videoElement.readyState >= 1) {
        console.log("Metadata already loaded, setting playback rate and playing");
        handleMetadata();   // only this line is necessary as the video is statically generated due to caching.
      } else {
        console.log("Adding event listener for loadedmetadata");
        videoElement.addEventListener("loadedmetadata", handleMetadata);
      }
      
    console.log("videoElement:", videoElement.readyState)
      return () => {
        videoElement.removeEventListener("loadedmetadata", handleMetadata);
      };
    }
  }, []);

  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center text-center py-10"
    >
      <div>
        <h1 className="text-4xl font-bold mb-4">MacBook Air</h1>
        <Image src="/title.png" alt="MacBook Air" width={900} height={300} />
      </div>

      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        muted
        playsInline
        preload="auto"
      />

      <button type="button"> Buy Now </button>
      <p>Starting at $999 or $41.62/mo for 24 mo.</p>
    </section>
  );
};

export default Hero;
