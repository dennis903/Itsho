'use client';

import Link from "next/link";
import { useState } from "react";

interface Post {
  id: number;
  type: 'review' | 'blog';
  title: string;
  author: string;
  date: string;
  preview: string;
  likes: number;
  comments: number;
  restaurant?: string;
  location?: string;
  rating?: number;
}

const mockPosts: Post[] = [
  {
    id: 1,
    type: 'review',
    title: "도쿄 히로시 라멘집 후기",
    author: "김민수",
    date: "2024-01-15",
    preview: "현지인들만 아는 진짜 라멘집! 국물이 진하면서도 느끼하지 않고 면발이 정말 쫄깃해요. 일본어 못해도 사장님이 친절하게...",
    likes: 24,
    comments: 8,
    restaurant: "히로시 라멘",
    location: "도쿄 시부야",
    rating: 5
  },
  {
    id: 2,
    type: 'blog',
    title: "오사카 3박4일 맛집 여행기",
    author: "박지영",
    date: "2024-01-12",
    preview: "오사카에서 현지인들이 추천해준 맛집들을 다녀왔어요! 타코야키부터 오코노미야키까지... 정말 잊을 수 없는 맛들이었습니다.",
    likes: 45,
    comments: 12
  },
  {
    id: 3,
    type: 'review',
    title: "교토 텐푸라 하나 - 정말 최고였어요",
    author: "이준호",
    date: "2024-01-10",
    preview: "교토 기온에 있는 텐푸라집인데 정말 예술이었습니다. 계절 재료로 만든 텐푸라의 바삭함과 단맛이...",
    likes: 18,
    comments: 5,
    restaurant: "교토 텐푸라 하나",
    location: "교토 기온",
    rating: 5
  },
  {
    id: 4,
    type: 'blog',
    title: "후쿠오카 야시장 투어 완전 정복",
    author: "최수진",
    date: "2024-01-08",
    preview: "후쿠오카 야시장은 정말 천국이에요! 하카타 라멘부터 야키토리까지 현지인들과 함께 먹는 재미가 쏠쏠했습니다.",
    likes: 32,
    comments: 15
  },
  {
    id: 5,
    type: 'review',
    title: "히로시마 야키니쿠 미츠루 - 와규 맛집",
    author: "정현우",
    date: "2024-01-05",
    preview: "히로시마에서 먹은 와규가 정말 인생 고기였어요. 가격은 좀 있지만 그만한 가치가 충분히 있습니다.",
    likes: 21,
    comments: 7,
    restaurant: "야키니쿠 미츠루",
    location: "히로시마 중심가",
    rating: 4
  }
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("latest");

  const filteredPosts = mockPosts.filter(post => {
    if (activeTab === "all") return true;
    return post.type === activeTab;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "popular":
        return b.likes - a.likes;
      case "comments":
        return b.comments - a.comments;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-orange-600">잇쇼</Link>
          <div className="flex space-x-6">
            <Link href="/restaurants" className="text-gray-700 hover:text-orange-600">맛집 찾기</Link>
            <Link href="/community" className="text-orange-600 font-medium">커뮤니티</Link>
            <Link href="/mypage" className="text-gray-700 hover:text-orange-600">마이페이지</Link>
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">커뮤니티</h1>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium">
              글쓰기
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            일본 여행의 생생한 맛집 경험을 공유하고, 다른 여행자들의 이야기를 만나보세요.
          </p>

          {/* Tab Navigation */}
          <div className="flex space-x-6 mb-6">
            {[
              { id: 'all', label: '전체' },
              { id: 'review', label: '맛집 리뷰' },
              { id: 'blog', label: '여행기' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-orange-600 border-orange-600'
                    : 'text-gray-600 border-transparent hover:text-orange-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">정렬:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="latest">최신순</option>
              <option value="popular">인기순</option>
              <option value="comments">댓글순</option>
            </select>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {sortedPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      post.type === 'review' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {post.type === 'review' ? '맛집 리뷰' : '여행기'}
                    </span>
                    {post.rating && (
                      <div className="flex items-center">
                        <span className="text-yellow-500">{'★'.repeat(post.rating)}{'☆'.repeat(5-post.rating)}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2 hover:text-orange-600 transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  
                  {post.restaurant && (
                    <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                      <span className="font-medium">{post.restaurant}</span>
                      <span>•</span>
                      <span>{post.location}</span>
                    </div>
                  )}
                  
                  <p className="text-gray-700 leading-relaxed">{post.preview}</p>
                </div>

                {/* Post Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>작성자: {post.author}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                      <span>♡</span>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </button>
                    <button className="hover:text-orange-600 transition-colors">
                      공유
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Topics */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">인기 주제</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "도쿄 현지인 맛집", count: 45, icon: "🍜" },
              { title: "오사카 야시장 투어", count: 32, icon: "🏮" },
              { title: "교토 전통 음식점", count: 28, icon: "🏯" },
              { title: "후쿠오카 라멘 순례", count: 23, icon: "🍲" },
              { title: "히로시마 오코노미야키", count: 19, icon: "🥞" },
              { title: "홋카이도 해산물", count: 15, icon: "🦀" }
            ].map((topic, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div>
                    <h3 className="font-semibold">{topic.title}</h3>
                    <span className="text-sm text-gray-500">{topic.count}개 글</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}