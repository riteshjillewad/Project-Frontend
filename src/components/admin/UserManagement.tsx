'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserCheck, 
  UserX, 
  Shield, 
  Mail, 
  Calendar,
  Eye,
  Ban,
  CheckCircle,
  AlertTriangle,
  Download
} from 'lucide-react'

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "sarahjohnson",
    email: "sarah.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    role: "user",
    status: "active",
    joinDate: "2023-12-15T10:30:00Z",
    lastActive: "2024-01-15T14:20:00Z",
    verified: true,
    stats: {
      stories: 8,
      followers: 234,
      following: 156,
      likes: 1247
    },
    location: "New York, USA",
    reportCount: 0
  },
  {
    id: 2,
    name: "Marcus Chen",
    username: "marcuschen",
    email: "marcus.chen@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    role: "user",
    status: "active",
    joinDate: "2023-11-20T08:15:00Z",
    lastActive: "2024-01-15T09:45:00Z",
    verified: false,
    stats: {
      stories: 15,
      followers: 567,
      following: 89,
      likes: 2134
    },
    location: "San Francisco, USA",
    reportCount: 1
  },
  {
    id: 3,
    name: "Emma Wilson",
    username: "emmawilson",
    email: "emma.wilson@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    role: "user",
    status: "suspended",
    joinDate: "2023-10-05T16:45:00Z",
    lastActive: "2024-01-10T11:30:00Z",
    verified: true,
    stats: {
      stories: 3,
      followers: 45,
      following: 78,
      likes: 234
    },
    location: "London, UK",
    reportCount: 3
  },
  {
    id: 4,
    name: "Alex Thompson",
    username: "alexthompson",
    email: "alex.thompson@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    role: "user",
    status: "active",
    joinDate: "2023-09-12T14:20:00Z",
    lastActive: "2024-01-15T16:10:00Z",
    verified: true,
    stats: {
      stories: 22,
      followers: 1234,
      following: 345,
      likes: 5678
    },
    location: "Toronto, Canada",
    reportCount: 0
  }
]

const statusColors = {
  active: 'bg-green-100 text-green-800',
  suspended: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800'
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRole, setFilterRole] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [showActionModal, setShowActionModal] = useState(false)
  const [actionType, setActionType] = useState<'suspend' | 'activate' | 'delete' | null>(null)

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesStatus && matchesRole
  })

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    )
  }

  const handleBulkAction = (action: 'suspend' | 'activate' | 'delete') => {
    setActionType(action)
    setShowActionModal(true)
  }

  const confirmBulkAction = () => {
    console.log(`Bulk ${actionType} for users:`, selectedUsers)
    setShowActionModal(false)
    setActionType(null)
    setSelectedUsers([])
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatLastActive = (dateString: string) => {
    const now = new Date()
    const lastActive = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return formatDate(dateString)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage platform users and their permissions</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} />
            <span>Export</span>
          </button>
          <Link
            href="/admin/admins"
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
          >
            <Shield size={16} />
            <span>Manage Admins</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{mockUsers.length}</p>
            </div>
            <UserCheck className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">{mockUsers.filter(u => u.status === 'active').length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Suspended</p>
              <p className="text-3xl font-bold text-gray-900">{mockUsers.filter(u => u.status === 'suspended').length}</p>
            </div>
            <Ban className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reported Users</p>
              <p className="text-3xl font-bold text-gray-900">{mockUsers.filter(u => u.reportCount > 0).length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
            <Filter size={16} className="mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedUsers.length} user(s) selected
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkAction('activate')}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction('suspend')}
                className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
              >
                Suspend
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedUsers([])}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
              onChange={handleSelectAll}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm font-medium text-gray-900">
              Users ({filteredUsers.length})
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />

                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    {user.verified && (
                      <CheckCircle className="absolute -bottom-1 -right-1 h-4 w-4 text-blue-500 bg-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{user.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                        {user.status}
                      </span>
                      {user.reportCount > 0 && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                          {user.reportCount} report(s)
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      @{user.username} • {user.email}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {user.location} • Joined {formatDate(user.joinDate)}
                    </div>
                  </div>

                  <div className="hidden md:flex items-center space-x-6 text-sm text-gray-500">
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{user.stats.stories}</div>
                      <div>Stories</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{user.stats.followers}</div>
                      <div>Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{user.stats.likes}</div>
                      <div>Likes</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      Last active: {formatLastActive(user.lastActive)}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        title="View Profile"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        title="Send Message"
                      >
                        <Mail size={16} />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        title="More Actions"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Confirmation Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm {actionType?.charAt(0).toUpperCase()}{actionType?.slice(1)} Action
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to {actionType} {selectedUsers.length} selected user(s)? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowActionModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmBulkAction}
                className={`px-4 py-2 rounded-lg text-white ${
                  actionType === 'delete' ? 'bg-red-600 hover:bg-red-700' :
                  actionType === 'suspend' ? 'bg-yellow-600 hover:bg-yellow-700' :
                  'bg-green-600 hover:bg-green-700'
                }`}
              >
                {actionType?.charAt(0).toUpperCase()}{actionType?.slice(1)} Users
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
