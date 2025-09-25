import { useState } from 'react'

import CourseSection from './CourseSection'
import Hero from './Hero'
import StatsAndTestimonials from './StatsAndTestimonials'
import UltimateToolkit from './UltimateToolkit'
import UltimateToolkitRow2 from './UltimateToolkitRow2'
import ThreeSteps from './StepStat'
import VideoSlider from './VideoSlider'
import RealStories from './RealStories'
import ReadyToTransform from './ReadyToTransform'
import GotQuestions from './GotQuestions'
import FloatingChatButtons from './FloatingChatButtons'
import Footer from './Footer'

function Home() {
    const [count, setCount] = useState(0)

    return (
        <>
            <FloatingChatButtons />
            <Hero />
            <CourseSection />
            <StatsAndTestimonials />
            <UltimateToolkit />
            <UltimateToolkitRow2 />
            <ThreeSteps />
            <VideoSlider />
            <ReadyToTransform />
            <RealStories />
            <GotQuestions />
            <Footer />
        </>
    )
}

export default Home
