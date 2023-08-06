<!--
Template for SETTING the current settings of the ePayment plugin for a specific Conference
Filled by sixPay/webinterface/pages/ePayments.py:WConfModifEPaymentSixPay.getVars
-->
<form action=${ postURL } method="POST">
    <table width="80%" align="center" border="0" style="border-left: 1px solid #777777">
        <tr>
            <td class="groupTitle" colspan="2">Configuration of sixPay</td>
        </tr>
        <tr>
            <td nowrap class="dataCaptionTD"><span class="titleCellFormat">Title</span></td>
            <td align="left"><input type="text" name="title" size="60" value="${ title }"></td>
        </tr>
        <tr>
            <td class="dataCaptionTD"><span class="dataCaptionFormat">SixPay Saferpay URL</span></td>
            <td align="left"><input type="text" name="url" size="60" value="${ url }"></td>
        </tr>
        <tr>
            <td class="dataCaptionTD"><span class="dataCaptionFormat">Account ID</span></td>
            <td align="left"><input type="text" name="account_id" size="60" value="${ account_id }"></td>
        </tr>
        <tr>
            <td class="dataCaptionTD"><span class="dataCaptionFormat">Transaction Description</span></td>
            <td align="left"><input type="text" name="user_description" size="60" value="${ user_description }"></td>
        </tr>
        <tr>
            <td class="dataCaptionTD"><span class="dataCaptionFormat">Notification Mail</span></td>
            <td align="left"><input type="text" name="notification_mail" size="60" value="${ notification_mail }"></td>
        </tr>
        <tr><td>&nbsp;</td></tr>
        <tr>
            <td colspan="2" align="left"><input type="submit" value="OK">&nbsp;<input type="submit" value="cancel" name="cancel"></td>
        </tr>
    </table>
</form>
