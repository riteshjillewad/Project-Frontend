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

      {/* Enhanced Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-xl p-6 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-blue-100 text-sm font-semibold tracking-wide">Total Users</p>
                <p className="text-3xl font-bold tracking-tight">{formatNumber(analyticsData.overview.totalUsers.value)}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-white/80 mb-1">
                <span>Progress to 10K target</span>
                <span className="font-semibold">89%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-white/60 to-white/80 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '89%' }}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className={`flex items-center px-2 py-1 rounded-full ${
                analyticsData.overview.totalUsers.trend === 'up' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
              }`}>
                {analyticsData.overview.totalUsers.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                <span className="font-medium">{analyticsData.overview.totalUsers.change}%</span>
              </div>
              <div className="text-xs text-white/70 font-medium">Excellent</div>
            </div>
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 rounded-xl p-6 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-green-100 text-sm font-semibold tracking-wide">Total Stories</p>
                <p className="text-3xl font-bold tracking-tight">{formatNumber(analyticsData.overview.totalStories.value)}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-white/80 mb-1">
                <span>Progress to 1.5K target</span>
                <span className="font-semibold">83%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-white/60 to-white/80 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '83%' }}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className={`flex items-center px-2 py-1 rounded-full ${
                analyticsData.overview.totalStories.trend === 'up' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
              }`}>
                {analyticsData.overview.totalStories.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                <span className="font-medium">{analyticsData.overview.totalStories.change}%</span>
              </div>
              <div className="text-xs text-white/70 font-medium">Very Good</div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 rounded-xl p-6 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-purple-100 text-sm font-semibold tracking-wide">Total Views</p>
                <p className="text-3xl font-bold tracking-tight">{formatNumber(analyticsData.overview.totalViews.value)}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-white/80 mb-1">
                <span>Monthly growth</span>
                <span className="font-semibold">+23%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-white/60 to-white/80 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '95%' }}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className={`flex items-center px-2 py-1 rounded-full ${
                analyticsData.overview.totalViews.trend === 'up' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
              }`}>
                {analyticsData.overview.totalViews.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                <span className="font-medium">{analyticsData.overview.totalViews.change}%</span>
              </div>
              <div className="text-xs text-white/70 font-medium">Outstanding</div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-600 to-red-700 rounded-xl p-6 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-pink-100 text-sm font-semibold tracking-wide">Engagement Rate</p>
                <p className="text-3xl font-bold tracking-tight">{analyticsData.overview.engagementRate.value}%</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-white/80 mb-1">
                <span>Industry benchmark: 65%</span>
                <span className="font-semibold">Above avg</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-white/60 to-white/80 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '68%' }}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className={`flex items-center px-2 py-1 rounded-full ${
                analyticsData.overview.engagementRate.trend === 'up' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
              }`}>
                {analyticsData.overview.engagementRate.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                <span className="font-medium">{Math.abs(analyticsData.overview.engagementRate.change)}%</span>
              </div>
              <div className="text-xs text-white/70 font-medium">Good</div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced User Growth Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">User & Story Growth</h3>
              <p className="text-sm text-gray-500">Monthly progression trends</p>
            </div>
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            {analyticsData.userGrowth.map((data, index) => (
              <div key={data.month} className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 text-sm font-semibold text-gray-700">{data.month}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-gray-900">Users: {formatNumber(data.users)}</span>
                    <span className="font-medium text-gray-700">Stories: {data.stories}</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg"
                        style={{ 
                          width: `${(data.users / 9000) * 100}%`,
                          transitionDelay: `${index * 0.1}s`
                        }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Growth: +{((data.users / (analyticsData.userGrowth[index-1]?.users || data.users)) * 100 - 100).toFixed(1)}%</span>
                    <span>{((data.users / 9000) * 100).toFixed(1)}% of target</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Device Statistics */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Device Usage</h3>
              <p className="text-sm text-gray-500">Platform distribution</p>
            </div>
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
              <Monitor className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="space-y-5">
            {analyticsData.deviceStats.map((device, index) => (
              <div key={device.device} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${device.color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
                      {device.device === 'Mobile' && <Smartphone className={`h-4 w-4 ${device.color.replace('bg-', 'text-')}`} />}
                      {device.device === 'Desktop' && <Monitor className={`h-4 w-4 ${device.color.replace('bg-', 'text-')}`} />}
                      {device.device === 'Tablet' && <Monitor className={`h-4 w-4 ${device.color.replace('bg-', 'text-')}`} />}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{device.device}</span>
                      <div className="text-xs text-gray-500">Primary platform</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{device.percentage}%</div>
                    <div className="text-xs text-gray-500">of total users</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`${device.color} h-3 rounded-full transition-all duration-1000 ease-out group-hover:shadow-md`}
                      style={{ 
                        width: `${device.percentage}%`,
                        transitionDelay: `${index * 0.2}s`
                      }}
                    ></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Top Genres */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Popular Genres</h3>
              <p className="text-sm text-gray-500">Content category breakdown</p>
            </div>
            <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
              <PieChart className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            {analyticsData.topGenres.map((genre, index) => {
              const colors = [
                { bg: 'bg-blue-500', ring: 'ring-blue-200', text: 'text-blue-600' },
                { bg: 'bg-green-500', ring: 'ring-green-200', text: 'text-green-600' },
                { bg: 'bg-purple-500', ring: 'ring-purple-200', text: 'text-purple-600' },
                { bg: 'bg-yellow-500', ring: 'ring-yellow-200', text: 'text-yellow-600' },
                { bg: 'bg-red-500', ring: 'ring-red-200', text: 'text-red-600' },
                { bg: 'bg-gray-500', ring: 'ring-gray-200', text: 'text-gray-600' }
              ]
              const color = colors[index] || colors[5]
              
              return (
                <div key={genre.genre} className="group p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`relative w-4 h-4 ${color.bg} rounded-full ring-4 ${color.ring} group-hover:scale-110 transition-transform`}>
                        <div className="absolute inset-0 bg-white/30 rounded-full"></div>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-900">{genre.genre}</span>
                        <div className="text-xs text-gray-500">Category</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{genre.stories}</div>
                      <div className={`text-xs font-medium ${color.text}`}>{genre.percentage}%</div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`${color.bg} h-2 rounded-full transition-all duration-1000 ease-out group-hover:shadow-sm`}
                        style={{ 
                          width: `${genre.percentage}%`,
                          transitionDelay: `${index * 0.1}s`
                        }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Enhanced Traffic Sources */}
        <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Traffic Sources</h3>
              <p className="text-sm text-gray-500">User acquisition channels</p>
            </div>
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg">
              <Globe className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="space-y-5">
            {analyticsData.trafficSources.map((source, index) => {
              const gradients = [
                'from-indigo-500 to-blue-600',
                'from-green-500 to-emerald-600', 
                'from-purple-500 to-violet-600',
                'from-orange-500 to-red-600'
              ]
              const gradient = gradients[index] || gradients[0]
              
              return (
                <div key={source.source} className="group p-3 rounded-lg hover:bg-white/70 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 bg-gradient-to-r ${gradient} rounded-lg group-hover:scale-110 transition-transform`}>
                        <Target className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-900">{source.source}</span>
                        <div className="text-xs text-gray-500">Traffic channel</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{formatNumber(source.visits)}</div>
                      <div className="text-xs text-gray-500">{source.percentage}% share</div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${gradient} h-3 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg`}
                        style={{ 
                          width: `${source.percentage}%`,
                          transitionDelay: `${index * 0.15}s`
                        }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Conversion rate: {(Math.random() * 5 + 2).toFixed(1)}%</span>
                    <span>Quality: {index < 2 ? 'High' : index < 3 ? 'Medium' : 'Good'}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Real-time Activity */}
      <div className="bg-gradient-to-br from-green-50 to-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Real-time Activity</h3>
              <p className="text-sm text-gray-500">Live platform updates</p>
            </div>
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <Activity className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="space-y-3">
          {analyticsData.recentActivity.map((activity, index) => {
            const typeConfig = {
              user: { 
                bg: 'bg-blue-500', 
                ring: 'ring-blue-200', 
                icon: '👤',
                bgLight: 'bg-blue-50',
                textColor: 'text-blue-600'
              },
              story: { 
                bg: 'bg-green-500', 
                ring: 'ring-green-200', 
                icon: '📝',
                bgLight: 'bg-green-50',
                textColor: 'text-green-600'
              },
              engagement: { 
                bg: 'bg-purple-500', 
                ring: 'ring-purple-200', 
                icon: '💜',
                bgLight: 'bg-purple-50',
                textColor: 'text-purple-600'
              }
            }
            const config = typeConfig[activity.type as keyof typeof typeConfig] || typeConfig.engagement
            
            return (
              <div key={index} className="group flex items-center space-x-4 p-4 hover:bg-white rounded-lg transition-all duration-200 border border-transparent hover:border-gray-100 hover:shadow-sm">
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 ${config.bgLight} rounded-full flex items-center justify-center ring-2 ${config.ring} group-hover:scale-110 transition-transform`}>
                    <span className="text-sm">{config.icon}</span>
                  </div>
                  <div className={`absolute -top-1 -right-1 w-4 h-4 ${config.bg} rounded-full flex items-center justify-center`}>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">{activity.action}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-gray-500">by</p>
                    <span className={`text-xs font-medium px-2 py-1 ${config.bgLight} ${config.textColor} rounded-full`}>
                      {activity.user}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-xs text-gray-400 font-medium">{activity.time}</div>
                  <div className={`text-xs ${config.textColor} capitalize font-medium`}>{activity.type}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live updates every 30 seconds</span>
            </div>
            <Link 
              href="/admin/activity" 
              className="inline-flex items-center space-x-1 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
            >
              <span>View all activity</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
