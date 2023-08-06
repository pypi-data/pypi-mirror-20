# gogs-ldap-groups-syncer

* manual execution:

  ``` sh
/usr/local/bin/gogs-ldap-groups-syncer -c ~/gogs-ldap-groups-syncer.conf 
  ```

* cronjob:

  ``` sh
* * * * * root /usr/local/bin/gogs-ldap-groups-syncer -c ~/gogs-ldap-groups-syncer.conf > /dev/null 2>&1
  ```


* logrotare:

  ```
/var/log/gogs-ldap-groups-syncer.log {
    weekly
    rotate 12
    compress
    delaycompress
    missingok
    notifempty
    create 0640 root adm
}
  ```
