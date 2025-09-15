import { useState } from 'react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to chat page with the query
      window.location.href = `/chat?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ padding: '20px 0', textAlign: 'center' }}>
      
      {/* Premium AI Search Bar - ONLY ADDITION */}
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto 40px auto', 
        padding: '0 20px' 
      }}>
        {/* AI Badge */}
        <div style={{ marginBottom: '12px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #f0f9ff, #e0e7ff)',
            color: '#1d4ed8',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '500',
            border: '1px solid #bfdbfe'
          }}>
            <span style={{ fontSize: '10px' }}>✨</span>
            Ask anything with AI Mode
          </span>
        </div>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
          borderRadius: '50px',
          padding: '3px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1), 0 3px 10px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            background: 'white',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '16px 24px',
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onClick={() => document.getElementById('searchInput').focus()}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.12)';
            e.target.style.borderColor = '#3b82f6';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            e.target.style.borderColor = '#e2e8f0';
          }}
          >
            {/* Search Icon */}
            <svg 
              width="20" 
              height="20" 
              fill="none" 
              stroke="#64748b" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
              style={{ flexShrink: 0 }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>

            {/* Input Field */}
            <input
              id="searchInput"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your health... (e.g., I have chest pain and shortness of breath)"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: '#1e293b',
                backgroundColor: 'transparent',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            />

            {/* Send Button */}
            <button
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
              style={{
                background: searchQuery.trim() 
                  ? 'linear-gradient(135deg, #3b82f6, #6366f1)' 
                  : '#e2e8f0',
                color: searchQuery.trim() ? 'white' : '#94a3b8',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: searchQuery.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                if (searchQuery.trim()) {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* YOUR EXISTING CONTENT - UNCHANGED */}
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>🏥 FitScan</h1>
        <h2>Your Health Assessment Platform</h2>
        <p>Index component is working!</p>
        <div style={{ marginTop: '20px' }}>
          <button style={{ padding: '10px 20px', margin: '5px' }}>
            Take Assessment
          </button>
          <button style={{ padding: '10px 20px', margin: '5px' }}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
