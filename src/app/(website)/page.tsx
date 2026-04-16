import React from 'react'
import HomeHero from './_components/HomeHero'
import AboutSection from './_components/AboutSection'
import SkillSection from './_components/SkillSection'
import ProjectSection from './_components/ProjectSection'
import Experience from './_components/ExperienceSection'
import RecruiterSection from './_components/RecruiterSection'
import KnowledgeHub from './_components/KnowledgeHub'
import ContactSection from './_components/ContactSection'
import ResumeSection from './_components/ResumeSection'
import ProfessionalFooter from './_components/Footer'

function page() {
  return (
    <div>
      <HomeHero />
      <AboutSection />
      <SkillSection />
      <ResumeSection />
      <ProjectSection />
      <Experience />
      <RecruiterSection />
      <KnowledgeHub />
      <ContactSection />
      <ProfessionalFooter />
    </div>
  )
}

export default page
