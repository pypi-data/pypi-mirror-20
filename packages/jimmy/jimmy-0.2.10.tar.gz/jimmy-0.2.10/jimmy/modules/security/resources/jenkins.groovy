/*
*  Copyright 2016 Mirantis, Inc.
*
*  Licensed under the Apache License, Version 2.0 (the "License"); you may
*  not use this file except in compliance with the License. You may obtain
*  a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
*  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
*  License for the specific language governing permissions and limitations
*  under the License.
*/

import hudson.model.Item
import hudson.model.Computer
import hudson.model.Hudson
import hudson.model.Run
import hudson.model.View
import hudson.security.Permission
import jenkins.model.Jenkins
import com.cloudbees.plugins.credentials.CredentialsProvider
import hudson.scm.SCM


class Actions {
  Actions(out) {
    this.out = out

    GroovyClassLoader loader = new GroovyClassLoader(this.class.getClassLoader())
    try {
      gerritTriggerPluginImpl = loader.loadClass("com.sonyericsson.hudson.plugins.gerrit.trigger.PluginImpl")
    } catch (ClassNotFoundException ex) {
      out.println("NOT FOUND: com.sonyericsson.hudson.plugins.gerrit.trigger.PluginImpl. Gerrit Trigger plugin not installed?")
    }
  }

  def out

  // Define variables for optional imports
  //
  def gerritTriggerPluginImpl


  // Creates or updates user
  //
  void makeUpdateUser(String user, String email=null, String passwd=null, String name=null, String pubKeys=null) {
    def setUser = hudson.model.User.get(user)
    if (name != null && name !="") {
      setUser.setFullName(name)
    }
    if (email != null && email !="") {
      def emailProperty = new hudson.tasks.Mailer.UserProperty(email)
      setUser.addProperty(emailProperty)
    }
    if (passwd != null && passwd !="") {
      def pwDetails = hudson.security.HudsonPrivateSecurityRealm.Details.fromPlainPassword(passwd)
      setUser.addProperty(pwDetails)
    }
    if (pubKeys != null && pubKeys !="") {
      def sshKeysProperty = new org.jenkinsci.main.modules.cli.auth.ssh.UserPropertyImpl(pubKeys)
      setUser.addProperty(sshKeysProperty)
    }
    setUser.save()
  }

  // Sets up security for the Jenkins Master instance.
  //
  void setSecurityLdap(
    String server=null,
    String rootDN=null,
    String userSearch=null,
    String inhibitInferRootDN=null,
    String userSearchBase=null,
    String groupSearchBase=null,
    String managerDN=null,
    String managerPassword=null,
    String ldapuser,
    String pubKeys=null,
    String email="",
    String password="",
    String name=""
  ) {

    if (inhibitInferRootDN==null) {
      inhibitInferRootDN = false
    }
    def instance = Jenkins.getInstance()
    def strategy
    def realm
    strategy = new hudson.security.ProjectMatrixAuthorizationStrategy()
    makeUpdateUser(ldapuser, email, password, name, pubKeys)

    def allPermissions = Permission.getAll()

    for (Permission p : allPermissions) {
      strategy.add(p,user)
    }

    realm = new hudson.security.LDAPSecurityRealm(
      server, rootDN, userSearchBase, userSearch, groupSearchBase, managerDN, managerPassword, inhibitInferRootDN.toBoolean()
    )
    // apply new strategy&realm
    instance.setAuthorizationStrategy(strategy)
    instance.setSecurityRealm(realm)
    // commit new settings permanently (in config.xml)
    instance.save()
  }

  void setUnsecured() {
    def instance = Jenkins.getInstance()
    def strategy
    def realm
    strategy = new hudson.security.AuthorizationStrategy.Unsecured()
    realm = new hudson.security.HudsonPrivateSecurityRealm(false, false, null)
    instance.setAuthorizationStrategy(strategy)
    instance.setSecurityRealm(realm)
    instance.save()
  }

  void setSecurityPassword(String user, String pubKeys=null, String password=null, String email=null, String name=null) {
    def instance = Jenkins.getInstance()
    def strategy
    def realm
    strategy = new hudson.security.ProjectMatrixAuthorizationStrategy()

    makeUpdateUser(user, email, password, name, pubKeys)

    def allPermissions = Permission.getAll()

    for (Permission p : allPermissions) {
      strategy.add(p,user)
    }


    if (instance.getSecurityRealm() instanceof hudson.security.HudsonPrivateSecurityRealm) {
      realm = instance.getSecurityRealm()
    } else {
      realm = new hudson.security.HudsonPrivateSecurityRealm(false)
    }
    // apply new strategy&realm
    instance.setAuthorizationStrategy(strategy)
    instance.setSecurityRealm(realm)
    // commit new settings permanently (in config.xml)
    instance.save()
  }

  void setPermissionsMatrix(
    String user,
    String permissions,
    String email=null,
    String password=null,
    String name=null,
    String pubKeys=null,
    String securityModel
  ) {
    def instance = Jenkins.getInstance()
    def strategy
    strategy = instance.getAuthorizationStrategy()
    List perms = permissions.split(',')

    if (securityModel == 'password') {
      makeUpdateUser(user, email, password, name, pubKeys)
    }

    if (perms.contains("job")) {
      for (Permission p : Item.PERMISSIONS.getPermissions()) {
        strategy.add(p,user)
      }
    }
    if (perms.contains("view")) {
      for (Permission p : View.PERMISSIONS.getPermissions()) {
        strategy.add(p,user)
      }
    }
    if (perms.contains("slave")) {
      for (Permission p : Computer.PERMISSIONS.getPermissions()) {
        strategy.add(p,user)
      }
    }
    if (perms.contains("overall")) {
      for (Permission p : Hudson.PERMISSIONS.getPermissions()) {
        strategy.add(p,user)
      }
    }
    if (perms.contains("run")) {
      for (Permission p : Run.PERMISSIONS.getPermissions()) {
        strategy.add(p,user)
      }
    }
    if (perms.contains("credentials")) {
        for (Permission p : CredentialsProvider.GROUP.getPermissions()) {
        strategy.add(p,user)
      }
    }
    if (perms.contains("scm")) {
      for (Permission p : SCM.PERMISSIONS.getPermissions()) {
        strategy.add(p,user)
      }
    }

    if (perms.contains("gerrit")) {
      for (Permission p : gerritTriggerPluginImpl.PERMISSION_GROUP.getPermissions()) {
        strategy.add(p,user)
      }
    }

    instance.setAuthorizationStrategy(strategy)
    instance.save()
  }
}

///////////////////////////////////////////////////////////////////////////////
// CLI Argument Processing
///////////////////////////////////////////////////////////////////////////////

actions = new Actions(out)
action = args[0]
if (args.length < 2) {
  actions."$action"()
} else {
  actions."$action"(*args[1..-1])
}

