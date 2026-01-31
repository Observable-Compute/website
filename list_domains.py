import paramiko
import os

# Check both servers for available domains
SERVERS = [
    {'host': '156.67.75.110', 'port': 65002, 'username': 'u690453326', 'password': '99y33!Lo6'},
    {'host': '157.173.208.214', 'port': 65002, 'username': 'u587439414', 'password': '99y33!Lo6'}
]

for server in SERVERS:
    print(f"\n--- Server: {server['host']} ---")
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(server['host'], port=server['port'], 
                   username=server['username'], password=server['password'])
        ftp = ssh.open_sftp()
        
        # Check domains directory
        domains_path = f"/home/{server['username']}/domains"
        try:
            domains = ftp.listdir(domains_path)
            print(f"  Domains found:")
            for d in sorted(domains):
                print(f"    - {d}")
        except:
            print("  No domains directory")
        
        ftp.close()
        ssh.close()
    except Exception as e:
        print(f"Connection error: {e}")
