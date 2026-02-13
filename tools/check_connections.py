import os
from dotenv import load_dotenv

# Load env variables
load_dotenv()

def check_env():
    print("--- CONNECTIVITY CHECK ---")
    
    # 1. Check Supabase
    sb_url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    sb_key = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    
    if sb_url and sb_key:
        print("[PASS] Supabase Configuration Found")
        # In a real scenario, we'd ping the health endpoint
    else:
        print("[FAIL] Supabase Keys Missing in .env")
        
    # 2. Check Gemini
    gemini_key = os.getenv("GOOGLE_API_KEY")
    if gemini_key:
        print("[PASS] Google Gemini Key Found")
    else:
        print("[FAIL] Google Gemini Key Missing in .env")
        
    print("--- END CHECK ---")

if __name__ == "__main__":
    check_env()
