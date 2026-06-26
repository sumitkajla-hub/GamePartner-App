import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-name">
            <span>🎮</span> GamePartner
          </div>
          <p className="footer-brand-desc">
            Connect with nearby players for indoor and outdoor games. Build your local sports community and never play alone again.
          </p>
        </div>

        <div>
          <h4 className="footer-heading">Platform</h4>
          <div className="footer-links">
            <Link href="/search" className="footer-link" id="footer-find-players">Find Players</Link>
            <Link href="/community" className="footer-link" id="footer-communities">Communities</Link>
            <Link href="/dashboard" className="footer-link" id="footer-dashboard">Dashboard</Link>
            <Link href="/register" className="footer-link" id="footer-register">Join Now</Link>
          </div>
        </div>

        <div>
          <h4 className="footer-heading">Games</h4>
          <div className="footer-links">
            <span className="footer-link">♟️ Chess</span>
            <span className="footer-link">🏸 Badminton</span>
            <span className="footer-link">🏓 Table Tennis</span>
            <span className="footer-link">🎯 Carrom</span>
            <span className="footer-link">🏏 Cricket</span>
          </div>
        </div>

        <div>
          <h4 className="footer-heading">Support</h4>
          <div className="footer-links">
            <span className="footer-link">Help Center</span>
            <span className="footer-link">Safety Guidelines</span>
            <span className="footer-link">Terms of Service</span>
            <span className="footer-link">Privacy Policy</span>
            <span className="footer-link">Contact Us</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2026 GamePartner. All rights reserved. Made with ❤️ for sports lovers.
        </p>
        <div className="footer-social">
          <span className="footer-social-link" id="social-twitter" title="Twitter">𝕏</span>
          <span className="footer-social-link" id="social-instagram" title="Instagram">📷</span>
          <span className="footer-social-link" id="social-linkedin" title="LinkedIn">in</span>
          <span className="footer-social-link" id="social-youtube" title="YouTube">▶</span>
        </div>
      </div>
    </footer>
  );
}
