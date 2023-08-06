Collectd Gnocchi Status
=======================

|collectd-gnocchi-status|

Overview
--------

This plugin provides valuable insight into your metrics and measures
backlog of Gnocchi when installed in an OpenStack environment. It costs
an API call to Gnocchi status API every $interval (set in the collectd
config file per the plugin). Gnocchi is a component of the OpenStack
Telemetry project for Metric-as-a-Service.

Sample Graph
------------

.. figure:: https://github.com/akrzos/collectd-gnocchi-status/blob/master/sample-gnocchi-status-collectd.png
   :alt: Sample Graph

Configuration
-------------

1. Assuming you have collectd installed already, append the following
   plugin details to your collectd.conf config file

   ::

       ```
       <LoadPlugin python>
         Globals true
       </LoadPlugin>

       <Plugin python>
         LogTraces true
         Interactive false
         Import "collectd_gnocchi_status"
         <Module collectd_gnocchi_status>
           interval 30
         </Module>
       </Plugin>
       ```

2. Setup your environment variables in the collectd systemd unit file

   ::

       ```
       # Populate the following variables with your stackrc/overcloudrc or openstackrc file
       # Tenant v1&v2 api, project for v3 api
       Environment=OS_TENANT_NAME=admin
       Environment=OS_PROJECT_NAME=admin

       Environment=OS_PASSWORD=xxxxxxxxxxxxxxxxxxxxxxxxx
       Environment=OS_USERNAME=admin
       Environment=OS_AUTH_URL=http://x.x.x.x:5000/v2.0
       Environment=OS_CLOUDNAME=overcloud
       Environment=OS_NO_CACHE=True
       # End Environment variables to configure
       ```

3. Install plugin

   ::

       ```
       [root@overcloud-controller-0 ~]# pip install collectd-gnocchi-status
       ```

4. Reload Systemd units

   ::

       [root@overcloud-controller-0 ~]# systemctl daemon-reload

5. Restart collectd

   ::

       [root@overcloud-controller-0 ~]# systemctl restart collectd

6. View metrics on Gnocchi in your TSDB

Graphite storage-aggregation.conf Example
-----------------------------------------

Included in the repo is an example Graphite storage-aggregation.conf
(sample-storage-aggregation.conf) to ensure that your Gnocchi status
metrics are not lost due to your retention sizing (Ex.
10s:7d,60s:90d,1h:180d) < the interval (30s) this plugin is set to
collect and publish samples. Simply copy and paste the example, into
your /etc/carbon/storage-aggregation.conf file on your Graphite server
prior to pushing these metrics and restart carbon-cache to reload this
configuration. If the metrics have already been pushed, you must either
use whisper-resize (included with Graphite) or remove the corresponding
whisper files after restarting carbon-cache to allow carbon to rebuild
them with the new parameters in storage-aggregation.conf.

Resources
---------

1. `Gnocchi.xyz`_
2. `Collectd.org`_

.. _Gnocchi.xyz: http://gnocchi.xyz/
.. _Collectd.org: https://collectd.org/

.. |collectd-gnocchi-status| image:: https://img.shields.io/pypi/v/collectd-gnocchi-status.svg
   :target: https://pypi.python.org/pypi/collectd-gnocchi-status
