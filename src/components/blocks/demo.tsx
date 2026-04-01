import { ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerSticky,
  HeroButton,
  HeroVideo } from "@/components/ui/animated-video-on-scroll"

// Applied teal and white colors instead of the dark stones per user request
export const HeroVideoDemo = () => {
  return (
    <section>
      <ContainerScroll className="h-[350vh]">
        <ContainerSticky
          style={{
            background:
              "radial-gradient(40% 40% at 50% 20%, #115e59 0%, #0f766e 22.92%, #0d9488 42.71%, #f0fdfa 88.54%)", 
          }}
          className="bg-teal-50 px-6 py-10 text-teal-950 flex flex-col items-center place-content-center justify-center pt-24"
        >
          <ContainerAnimated className="space-y-4 text-center mt-32 z-10 w-full fixed top-24 left-0">
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tighter text-white md:text-7xl drop-shadow-md">
              THE ROAD TO GREEN OR RUIN?
            </h1>
            <p className="mx-auto max-w-[42ch] text-teal-50 drop-shadow opacity-90 text-lg">
              Artificial Intelligence is reshaping how cities move — but the environmental consequences of smart traffic systems demand urgent scrutiny.
            </p>
          </ContainerAnimated>

          <ContainerInset className="max-h-[70vh] w-full max-w-5xl mx-auto py-6 mt-[25vh]">
            <HeroVideo
              src="https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4"
              data-src="https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4"
            />
          </ContainerInset>
          
          <ContainerAnimated
            transition={{ delay: 0.4 }}
            outputRange={[-120, 0]}
            inputRange={[0, 0.7]}
            className="mx-auto mt-12 w-fit z-20 absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <HeroButton className="bg-white border-teal-500 text-teal-800 shadow-[0px_4px_24px_#14b8a6] hover:bg-teal-50">
              Get Started
            </HeroButton>
          </ContainerAnimated>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  )
}
