import React from 'react'
import HomeHero from './_components/HomeHero'
import AboutSection from './_components/AboutSection'
import SkillSection from './_components/SkillSection'
import ProjectSection from './_components/ProjectSection'

function page() {
  return (
    <div>
      <HomeHero />
      <AboutSection />
      <SkillSection />
      <ProjectSection />
    </div>
  )
}

export default page
