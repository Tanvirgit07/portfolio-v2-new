import React from 'react'
import HomeHero from './_components/HomeHero'
import AboutSection from './_components/AboutSection'
import SkillSection from './_components/SkillSection'
import ProjectSection from './_components/ProjectSection'
import Experience from './_components/ExperienceSection'

function page() {
  return (
    <div>
      <HomeHero />
      <AboutSection />
      <SkillSection />
      <ProjectSection />
      <Experience />
    </div>
  )
}

export default page
