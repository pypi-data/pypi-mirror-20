Radware NG driver for Openstack KILO Neutron LBaaS v1
-----------------------------------------------------

This is the Radware NG driver for
OpenStack Neutron LOADBALANCER service v1, KILO release.

In order to activate Radware's lbaas provider, perform following steps:

    1. Install the radware_os_lb_v1_kilo package by executing the following command (use sudo if needed):
       
       pip install radware_os_lb_v1_kilo

    2. Open the neutron configuration file named neutron_lbaas.conf.
       Under [service_providers] section, next to Haproxy LOADBALANCER provider,
       add new line, declaring the Radware LOADBALANCER provider.
       
       service_provider = LOADBALANCER:radwarev1:radware_os_lb_v1_kilo.v1_driver.RadwareLBaaSV1Driver:default

       To keep the HAproxy provider as a default LOADBALANCER provider, 
       remove the attribute :default from the Radware LOADBALANCER provider line.
       Otherwise, remove the :default attribute of the HAproxy LOADBALNCER provider line. 

    3. Add new section called [radwarev1] at the end of neutron configuration file named neutron.conf.
       Add following Radware LOADBALANCER parameters under the section:
           
           vdirect_address = < Your vDirect server IP address > 

    4. For additional Radware LBaaS configuration parameters,
       please see the documentation

    5. Restart the neutron-server service

Following is an example of neutron_lbaas.conf file after editing:

    [service_providers]

    service_provider=LOADBALANCER:Haproxy:neutron_lbaas.drivers.haproxy.plugin_driver.HaproxyOnHostPluginDriver:default
    service_provider=LOADBALANCER:radwarev1:radware_os_lb_v1_kilo.v1_driver.RadwareLBaaSV1Driver

Following is an example of neutron.conf file after editing:

    [radwarev1]
    vdirect_address=< Your vDirect server IP address >

