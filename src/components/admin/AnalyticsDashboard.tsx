'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  Eye, 
  Heart,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  Target
} from 'lucide-react'
import Link from 'next/link'

// Mock analytics data
const analyticsData = {
  overview: {
    totalUsers: { value: 8934, change: 8.2, trend: 'up' },
    totalStories: { value: 1247, change: 12.5, trend: 'up' },
    totalViews: { value: 125678, change: 23.1, trend: 'up' },
    engagementRate: { value: 68.5, change: -2.3, trend: 'down' }
  },
  userGrowth: [
    { month: 'Jan', users: 6200, stories: 890 },
    { month: 'Feb', users: 6800, stories: 920 },
    { month: 'Mar', users: 7200, stories: 980 },
    { month: 'Apr', users: 7600, stories: 1020 },
    { month: 'May', users: 8100, stories: 1100 },
    { month: 'Jun', users: 8500, stories: 1180 },
    { month: 'Jul', users: 8934, stories: 1247 }
  ],
  deviceStats: [
    { device: 'Mobile', percentage: 65, color: 'bg-blue-500' },
    { device: 'Desktop', percentage: 28, color: 'bg-green-500' },
    { device: 'Tablet', percentage: 7, color: 'bg-purple-500' }
  ],
  topGenres: [
    { genre: 'Romance', stories: 342, percentage: 27.4 },
    { genre: 'Sci-Fi', stories: 298, percentage: 23.9 },
    { genre: 'Mystery', stories: 187, percentage: 15.0 },
    { genre: 'Fantasy', stories: 156, percentage: 12.5 },
    { genre: 'Drama', stories: 134, percentage: 10.7 },
    { genre: 'Others', stories: 130, percentage: 10.4 }
  ],
  recentActivity: [
    { time: '2 min ago', action: 'New user registered', user: 'Sarah Chen', type: 'user' },
    { time: '5 min ago', action: 'Story published', user: 'Alex Thompson', type: 'story' },
    { time: '8 min ago', action: 'Comment posted', user: 'Emma Wilson', type: 'engagement' },
    { time: '12 min ago', action: 'Story liked', user: 'Marcus Rivera', type: 'engagement' },
    { time: '15 min ago', action: 'New user registered', user: 'David Kim', type: 'user' }
  ],
  trafficSources: [
    { source: 'Direct', visits: 45230, percentage: 42.1 },
    { source: 'Social Media', visits: 28450, percentage: 26.5 },
    { source: 'Search Engines', visits: 21340, percentage: 19.9 },
    { source: 'Referrals', visits: 12340, percentage: 11.5 }
  ]
}

export default function AnalyticsDashboard() {
  const [mounted, setMounted] = useState(false)
  const [timeRange, setTimeRange] = useState('7d')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights into your platform performance</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm">Total Users</p>
              <p className="text-3xl font-bold">{formatNumber(analyticsData.overview.totalUsers.value)}</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
          <div className={`flex items-center text-sm ${
            analyticsData.overview.totalUsers.trend === 'up' ? 'text-green-200' : 'text-red-200'
          }`}>
            {analyticsData.overview.totalUsers.trend === 'up' ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span>{analyticsData.overview.totalUsers.change}% vs last period</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm">Total Stories</p>
              <p className="text-3xl font-bold">{formatNumber(analyticsData.overview.totalStories.value)}</p>
            </div>
            <FileText className="h-8 w-8 text-green-200" />
          </div>
          <div className={`flex items-center text-sm ${
            analyticsData.overview.totalStories.trend === 'up' ? 'text-green-200' : 'text-red-200'
          }`}>
            {analyticsData.overview.totalStories.trend === 'up' ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span>{analyticsData.overview.totalStories.change}% vs last period</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-purple-100 text-sm">Total Views</p>
              <p className="text-3xl font-bold">{formatNumber(analyticsData.overview.totalViews.value)}</p>
            </div>
            <Eye className="h-8 w-8 text-purple-200" />
          </div>
          <div className={`flex items-center text-sm ${
            analyticsData.overview.totalViews.trend === 'up' ? 'text-green-200' : 'text-red-200'
          }`}>
            {analyticsData.overview.totalViews.trend === 'up' ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span>{analyticsData.overview.totalViews.change}% vs last period</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-pink-100 text-sm">Engagement Rate</p>
              <p className="text-3xl font-bold">{analyticsData.overview.engagementRate.value}%</p>
            </div>
            <Heart className="h-8 w-8 text-pink-200" />
          </div>
          <div className={`flex items-center text-sm ${
            analyticsData.overview.engagementRate.trend === 'up' ? 'text-green-200' : 'text-red-200'
          }`}>
            {analyticsData.overview.engagementRate.trend === 'up' ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span>{Math.abs(analyticsData.overview.engagementRate.change)}% vs last period</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">User & Story Growth</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.userGrowth.map((data, index) => (
              <div key={data.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm text-gray-600">{data.month}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Users: {formatNumber(data.users)}</span>
                    <span>Stories: {data.stories}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(data.users / 9000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Statistics */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Device Usage</h3>
            <Monitor className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.deviceStats.map((device, index) => (
              <div key={device.device} className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 w-20">
                  {device.device === 'Mobile' && <Smartphone className="h-4 w-4 text-blue-500" />}
                  {device.device === 'Desktop' && <Monitor className="h-4 w-4 text-green-500" />}
                  {device.device === 'Tablet' && <Monitor className="h-4 w-4 text-purple-500" />}
                  <span className="text-sm text-gray-600">{device.device}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{device.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${device.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Genres */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Popular Genres</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {analyticsData.topGenres.map((genre, index) => (
              <div key={genre.genre} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-purple-500' :
                    index === 3 ? 'bg-yellow-500' :
                    index === 4 ? 'bg-red-500' : 'bg-gray-400'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900">{genre.genre}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{genre.stories}</div>
                  <div className="text-xs text-gray-500">{genre.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.trafficSources.map((source, index) => (
              <div key={source.source} className="flex items-center space-x-4">
                <div className="w-24 text-sm text-gray-600">{source.source}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{formatNumber(source.visits)} visits</span>
                    <span>{source.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Real-time Activity</h3>
          <Activity className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {analyticsData.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'user' ? 'bg-blue-500' :
                activity.type === 'story' ? 'bg-green-500' : 'bg-purple-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">by {activity.user}</p>
              </div>
              <div className="text-xs text-gray-400">{activity.time}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/admin/activity" className="text-sm text-purple-600 hover:text-purple-700">
            View all activity →
          </Link>
        </div>
      </div>
    </div>
  )
}
