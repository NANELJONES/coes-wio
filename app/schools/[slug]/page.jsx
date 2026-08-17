"use client"
import { use } from 'react'
import SchoolDetailClient from './SchoolDetailClient'

export default function SchoolDetail({ params }) {
  const { slug } = use(params)
  
  return <SchoolDetailClient slug={slug} />
}