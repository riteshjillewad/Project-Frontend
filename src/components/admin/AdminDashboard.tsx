'use client'

import { useState, useEffect } from 'react'
import { 
  FileText, 
  Users, 
  Eye, 
  Heart, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle 
} from 'lucide-react'
import Link from 'next/link'
import AdminLoading from './AdminLoading'

// Mock dashboard data
const dashboardStats = {
  totalStories: 1247,
  totalUsers: 8934,
  totalViews: 125678,
  totalLikes: 23456,
  pendingReviews: 12,
  todaySubmissions: 8,
  activeUsers: 234,
  reportedContent: 3
}

const recentActivity = [
  {
    id: 1,
    type: 'story_submitted',
    message: 'New story "Digital Dreams" submitted by Alex Chen',
    time: '5 minutes ago',
    status: 'pending'
  },
  {
    id: 2,
    type: 'user_registered',
    message: 'New user Sarah Johnson registered',
    time: '12 minutes ago',
    status: 'success'
  },
  {
    id: 3,
    type: 'content_reported',
    message: 'Story "Midnight Tales" reported for inappropriate content',
    time: '1 hour ago',
    status: 'warning'
  },
  {
    id: 4,
    type: 'story_approved',
    message: 'Story "Ocean Whispers" approved and published',
    time: '2 hours ago',
    status: 'success'
  }
]

const pendingStories = [
  {
    id: 1,
    title: 'The Last Horizon',
    author: 'Emma Wilson',
    submittedAt: '2 hours ago',
    genre: 'Sci-Fi',
    wordCount: 2340
  },
  {
    id: 2,
    title: 'City Lights',
    author: 'Marcus Chen',
    submittedAt: '4 hours ago',
    genre: 'Romance',
    wordCount: 1890
  },
  {
    id: 3,
    title: 'Digital Dreams',
    author: 'Alex Thompson',
    submittedAt: '6 hours ago',
    genre: 'Fiction',
    wordCount: 3120
  }
]

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <AdminLoading />
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening on your platform.</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: Just now
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Stories</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalStories.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+8% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalViews.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+23% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Likes</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalLikes.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+15% from last month</span>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/stories" className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 hover:bg-yellow-100 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800">Pending Reviews</p>
              <p className="text-2xl font-bold text-yellow-900">{dashboardStats.pendingReviews}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-sm text-yellow-700 mt-2">Stories awaiting approval</p>
        </Link>

        <Link href="/admin/stories" className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:bg-blue-100 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Today's Submissions</p>
              <p className="text-2xl font-bold text-blue-900">{dashboardStats.todaySubmissions}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-blue-700 mt-2">New stories submitted today</p>
        </Link>

        <Link href="/admin/users" className="bg-green-50 border border-green-200 rounded-lg p-6 hover:bg-green-100 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Active Users</p>
              <p className="text-2xl font-bold text-green-900">{dashboardStats.activeUsers}</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-700 mt-2">Users active in last 24h</p>
        </Link>

        <Link href="/admin/reports" className="bg-red-50 border border-red-200 rounded-lg p-6 hover:bg-red-100 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800">Reported Content</p>
              <p className="text-2xl font-bold text-red-900">{dashboardStats.reportedContent}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-sm text-red-700 mt-2">Content requiring attention</p>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-400' :
                    activity.status === 'warning' ? 'bg-yellow-400' :
                    'bg-blue-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/admin/activity" className="text-sm font-medium text-purple-600 hover:text-purple-700">
                View all activity →
              </Link>
            </div>
          </div>
        </div>

        {/* Pending Stories */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Pending Story Reviews</h3>
            <Link href="/admin/stories" className="text-sm font-medium text-purple-600 hover:text-purple-700">
              View All
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingStories.map((story) => (
                <div key={story.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{story.title}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>by {story.author}</span>
                      <span>•</span>
                      <span>{story.genre}</span>
                      <span>•</span>
                      <span>{story.wordCount} words</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Submitted {story.submittedAt}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full hover:bg-red-200 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
