import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-600">잇쇼</div>
          <div className="flex space-x-6">
            <Link href="/restaurants" className="text-gray-700 hover:text-orange-600">맛집 찾기</Link>
            <Link href="/community" className="text-gray-700 hover:text-orange-600">커뮤니티</Link>
            <Link href="/mypage" className="text-gray-700 hover:text-orange-600">마이페이지</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-8">
            잇쇼
          </h1>
          <div className="text-xl text-gray-600 leading-relaxed mb-2">
            &ldquo;늦은 밤, 골목 어귀. 조용히 문을 여는 한 그릇의 식당.&rdquo;
          </div>
          <div className="text-xl text-gray-600 leading-relaxed mb-2">
            &ldquo;그곳엔 여행자가 아닌, 사람이 있었다.&rdquo;
          </div>
          <div className="text-2xl font-semibold text-orange-600 mt-6">
            &ldquo;잇쇼 – 함께여서 따뜻한 식당들.&rdquo;
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-center mb-6">어디서 식사하고 싶으세요?</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <select className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option value="">지역을 선택하세요</option>
              <option value="tokyo">도쿄</option>
              <option value="osaka">오사카</option>
              <option value="kyoto">교토</option>
              <option value="hiroshima">히로시마</option>
              <option value="fukuoka">후쿠오카</option>
            </select>
            <select className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option value="">음식 종류</option>
              <option value="ramen">라멘</option>
              <option value="sushi">스시</option>
              <option value="izakaya">이자카야</option>
              <option value="yakiniku">야키니쿠</option>
              <option value="tempura">텐푸라</option>
            </select>
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium">
              맛집 찾기
            </button>
          </div>
        </div>

        {/* Popular Restaurants Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">인기 맛집</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    맛집 이미지
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">현지인 추천 라멘집</h3>
                  <p className="text-gray-600 mb-2">도쿄 시부야</p>
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-500">★★★★☆</span>
                    <span className="text-gray-600 ml-2">4.2 (128 리뷰)</span>
                  </div>
                  <p className="text-sm text-gray-700">현지인들만 아는 숨겨진 라멘집. 진짜 도쿄 맛을 경험할 수 있습니다.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-12">잇쇼만의 특별함</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl mb-4">🏮</div>
              <h3 className="text-xl font-semibold mb-3">현지 큐레이션</h3>
              <p className="text-gray-600">일본 현지인이 직접 추천하는 진짜 맛집만을 소개합니다.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🇰🇷</div>
              <h3 className="text-xl font-semibold mb-3">한국어 서비스</h3>
              <p className="text-gray-600">복잡한 일본어 없이, 한국어로 편리하게 이용하세요.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-3">진정한 경험</h3>
              <p className="text-gray-600">관광지가 아닌, 현지인의 일상 속 따뜻한 공간을 만나보세요.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-xl font-bold mb-2">잇쇼</div>
          <p className="text-gray-400">함께여서 따뜻한 식당들</p>
        </div>
      </footer>
    </div>
  );
}
