Marathon-ZDD
============

Standalone version of the excellent ZDD script written by the guys over
at https://github.com/mesosphere/marathon-lb

Zero-downtime Deployments
-------------------------

Marathon-lb is able to perform canary style blue/green deployment with
zero downtime. To execute such deployments, you must follow certain
patterns when using Marathon.

The deployment method is described `in this Marathon document`_.
Marathon-lb provides an implementation of the aforementioned deployment
method with the script ```zdd```_. To perform a zero downtime deploy
using ``zdd``, you must:

-  Specify the ``HAPROXY_DEPLOYMENT_GROUP`` and
   ``HAPROXY_DEPLOYMENT_ALT_PORT`` labels in your app template
-  ``HAPROXY_DEPLOYMENT_GROUP``: This label uniquely identifies a pair
   of apps belonging to a blue/green deployment, and will be used as the
   app name in the HAProxy configuration
-  ``HAPROXY_DEPLOYMENT_ALT_PORT``: An alternate service port is
   required because Marathon requires service ports to be unique across
   all apps
-  Only use 1 service port: multiple ports are not yet implemented
-  Use the provided ``zdd.py`` script to orchestrate the deploy: the
   script will make API calls to Marathon, and use the HAProxy stats
   endpoint to gracefully terminate instances
-  The marathon-lb container must be run in privileged mode (to execute
   ``iptables`` commands) due to the issues outlined in the excellent
   blog post by the `Yelp engineering team found here`_
-  If you have long-lived TCP connections using the same HAProxy
   instances, it may cause the deploy to take longer than necessary. The
   script will wait up to 5 minutes (by default) for connections to
   drain from HAProxy between steps, but any long-lived TCP connections
   will cause old instances of HAProxy to stick around.

An example minimal configuration for a `test instance of nginx is
included here`_. You might execute a deployment from a CI tool like
Jenkins with:

::

    zdd -j 1-nginx.json -m http://master.mesos:8080 -f -l http://marathon-lb.marathon.mesos:9090 --syslog-socket /dev/null

Zero downtime deployments are accomplished through the use of a Lua
module, which reports the number of HAProxy processes which are
currently running by hitting the stats endpoint at the
``/_haproxy_getpids``. After a restart, there will be multiple HAProxy
PIDs until all remaining connections have gracefully terminated. By
waiting for all connections to complete, you may safely and
deterministically drain tasks. A caveat of this, however, is that if you
have any long-lived connections on the same LB, HAProxy will continue to
run and serve those connections until they complete, thereby breaking
this technique.

The ZDD script includes the ability to specify a pre-kill hook, which is
executed before draining tasks are terminated. This allows you to run
your own automated checks against the old and new a

.. _in this Marathon document: https://mesosphere.github.io/marathon/docs/blue-green-deploy.html
.. _``zdd``: zdd
.. _Yelp engineering team found here: http://engineeringblog.yelp.com/2015/04/true-zero-downtime-haproxy-reloads.html
.. _test instance of nginx is included here: tests/1-nginx.json
