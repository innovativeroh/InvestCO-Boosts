"use client"
import Feedbacks from '@/components/api/Feedback'
import Header from '@/components/core/Header'
import BackgroundStars from '@/components/ui/background-beams'
import React from 'react'

const page = () => {
  return (
    <>
        <Header />
        <BackgroundStars />
        <Feedbacks />
    </>
  )
}

export default page