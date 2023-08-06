<!--
Template for DISPLAYING the current settings of the ePayment plugin for a specific Conference
Filled by sixPay/webinterface/pages/ePayments.py:WConfModifEPaymentSixPay.getVars
-->
<table width="90%" align="left" border="0">
    <tr>
        <td class="dataCaptionTD"><span class="dataCaptionFormat">Title</span></td>
        <td bgcolor="white" width="100%" class="blacktext">${ title }</td>
        <form action=${ dataModificationURL } method="POST">
        <td rowspan="3" valign="bottom" align="right">
            <input type="submit" value="modify">
        </td>
        </form>
    </tr>
    <tr>
        <td class="dataCaptionTD"><span class="dataCaptionFormat">SixPay Saferpay URL</span></td>
        <td bgcolor="white" width="100%" class="blacktext"><pre>${ url }</pre></td>
    </tr>
    <tr>
        <td class="dataCaptionTD"><span class="dataCaptionFormat">Account ID</span></td>
        <td bgcolor="white" width="100%" class="blacktext"><pre>${ account_id }</pre></td>
    </tr>
    <tr>
        <td class="dataCaptionTD"><span class="dataCaptionFormat">Transaction Description</span></td>
        <td bgcolor="white" width="100%" class="blacktext"><pre>${ user_description }</pre></td>
    </tr>
    <tr>
        <td class="dataCaptionTD"><span class="dataCaptionFormat">Notification Mail</span></td>
        <td bgcolor="white" width="100%" class="blacktext"><pre>${ notification_mail }</pre></td>
    </tr>
    <tr><td>&nbsp;</td></tr>
</table>
