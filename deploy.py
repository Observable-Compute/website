import paramiko
import os

# Configuration
SERVERS = [
    {'host': '156.67.75.110', 'port': 65002, 'username': 'u690453326', 'password': '99y33!Lo6'}
]

DOMAIN = 'observablecompute.org'
LOCAL_DIST = r'C:\Users\AS\.gemini\observablecompute.org\dist'

def deploy_site():
    for server in SERVERS:
        print(f"\n--- Deploying to {server['host']} ---")
        try:
            ssh = paramiko.SSHClient()
            ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            ssh.connect(server['host'], port=server['port'], 
                       username=server['username'], password=server['password'])
            ftp = ssh.open_sftp()
            
            base_path = f"/home/{server['username']}/domains/{DOMAIN}/public_html"
            
            # Check if domain path exists
            try:
                ftp.stat(base_path)
            except FileNotFoundError:
                # Try alternate path
                base_path = f"/home/{server['username']}/public_html"
                try:
                    ftp.stat(base_path)
                except FileNotFoundError:
                    print(f"  [ERROR] No valid path found for {DOMAIN}")
                    continue
            
            print(f"  Deploying to: {base_path}")
            
            # Upload all files from dist
            uploaded = 0
            for root, dirs, files in os.walk(LOCAL_DIST):
                # Get relative path
                rel_root = os.path.relpath(root, LOCAL_DIST)
                if rel_root == '.':
                    remote_root = base_path
                else:
                    remote_root = f"{base_path}/{rel_root.replace(os.sep, '/')}"
                
                # Create directories
                for d in dirs:
                    remote_dir = f"{remote_root}/{d}"
                    try:
                        ftp.stat(remote_dir)
                    except FileNotFoundError:
                        try:
                            ftp.mkdir(remote_dir)
                            print(f"  [DIR] Created {d}/")
                        except:
                            pass
                
                # Upload files
                for f in files:
                    local_file = os.path.join(root, f)
                    remote_file = f"{remote_root}/{f}"
                    
                    try:
                        with open(local_file, 'rb') as lf:
                            content = lf.read()
                        with ftp.open(remote_file, 'wb') as rf:
                            rf.write(content)
                        print(f"  [FILE] {remote_file.replace(base_path, '')}")
                        uploaded += 1
                    except Exception as e:
                        print(f"  [ERROR] {f}: {e}")
            
            print(f"\n  === {uploaded} files uploaded ===")
            
            ftp.close()
            ssh.close()
        except Exception as e:
            print(f"Connection error: {e}")

if __name__ == "__main__":
    deploy_site()
