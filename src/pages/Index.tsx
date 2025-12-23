import ParticleBackground from '@/components/ParticleBackground';
import ProfileCard from '@/components/ProfileCard';
import SocialLinks from '@/components/SocialLinks';
import AboutMe from '@/components/AboutMe';
import ChatBox from '@/components/ChatBox';
import MusicPlayer from '@/components/MusicPlayer';
import avatarImage from '@/assets/avatar.png';

const Index = () => {
  return (
    <>
      {/* SEO */}
      <title>Wilwither | Perfil Pessoal</title>
      <meta name="description" content="Perfil pessoal de Wilwither - Gamer, Tech Enthusiast e Music Lover. Conecte-se comigo no Discord, Roblox e Steam!" />
      
      {/* Background */}
      <div className="fixed inset-0 bg-background" />
      <ParticleBackground />
      
      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl mx-auto space-y-10">
          {/* Profile Card */}
          <div className="flex justify-center">
            <ProfileCard avatarUrl={avatarImage} />
          </div>

          {/* Social Links */}
          <SocialLinks />

          {/* About Me */}
          <AboutMe />
        </div>
      </main>

      {/* Fixed Elements */}
      <MusicPlayer />
      <ChatBox />
    </>
  );
};

export default Index;
