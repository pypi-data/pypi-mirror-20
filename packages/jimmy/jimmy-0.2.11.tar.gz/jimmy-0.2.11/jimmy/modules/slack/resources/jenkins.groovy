/*
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

import jenkins.model.Jenkins
import net.sf.json.JSONObject

class Actions {
  Actions(out) { this.out = out }
  def out

  void setSlackConfig(
    String teamSubdomain,
    String token="",
    String tokenCredentials="",
    String channel,
    String webhookToken="",
    String webhookEndpoint=""
  ) {

    def inst = Jenkins.getInstance()
    def descr = inst.getDescriptor("jenkins.plugins.slack.SlackNotifier")
    def webhookDescr = inst.getDescriptor("jenkins.plugins.slack.webhook.GlobalConfig")

    def slackSettings = [
      slackTeamDomain: teamSubdomain,
      slackToken: token,
      slackRoom: channel,
      slackSendAs: ''
    ]

    def request = [
      getParameter: { name -> slackSettings[name] }
    ] as org.kohsuke.stapler.StaplerRequest

    def tokenSettings = [
      slack: [
        tokenCredentialId: tokenCredentials
      ]
    ]

    JSONObject tokenCredentialsSettings = JSONObject.fromObject(tokenSettings)

    descr.configure(request, tokenCredentialsSettings)
    descr.save()

    webhookDescr.setSlackOutgoingWebhookToken(webhookToken)
    webhookDescr.setSlackOutgoingWebhookURL(webhookEndpoint)
    webhookDescr.save()

    inst.save()
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
