// Standalone cleanup script for clearing temporary data
// Run this script when you want to clean up all temporary data

// Import the cleanup utilities
import performCompleteCleanup from './utils/cleanupUtils.js';

// Function to run cleanup
function runCleanup() {
  console.log('🚀 Starting cleanup process...');
  
  try {
    performCompleteCleanup();
    
    // Additional cleanup for any other temporary data
    console.log('🧹 Checking for any remaining temporary files...');
    
    // Clear any session storage
    sessionStorage.clear();
    console.log('✅ Session storage cleared');
    
    // Clear any cookies (if any)
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    console.log('✅ Cookies cleared');
    
    console.log('🎉 Cleanup completed successfully!');
    console.log('📋 Summary of what was cleared:');
    console.log('   • User favorites');
    console.log('   • User posts');
    console.log('   • User transactions');
    console.log('   • User reviews');
    console.log('   • Cart items');
    console.log('   • Authentication data');
    console.log('   • Session storage');
    console.log('   • Cookies');
    console.log('');
    console.log('🔄 The app is now reset to its initial state.');
    console.log('👤 Default test users are available:');
    console.log('   • Email: test@example.com, Password: password123');
    console.log('   • Email: demo@example.com, Password: demo123');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
}

// Run cleanup if this script is executed directly
if (typeof window !== 'undefined') {
  // Browser environment
  window.runCleanup = runCleanup;
  console.log('🧹 Cleanup script loaded. Run window.runCleanup() in the console to clean up data.');
} else {
  // Node.js environment
  runCleanup();
}

export default runCleanup;

