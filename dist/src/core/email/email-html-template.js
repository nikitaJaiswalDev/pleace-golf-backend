"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHtmlTemplate = void 0;
class EmailHtmlTemplate {
    static getPleaceGolfTemplate() {
        return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
          <head>
            
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
            <!--[if (gte mso 9)|(IE)]>
            <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
            <style type="text/css">
              body {width: 600px;margin: 0 auto;}
              table {border-collapse: collapse;}
              table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
              img {-ms-interpolation-mode: bicubic;}
            </style>
            <![endif]-->
        
            <style type="text/css">
              body, p, div {
                font-family: arial;
                font-size: 14px;
              }
              body {
                color: #000000;
              }
              body a {
                color: #1188E6;
                text-decoration: none;
              }
              p { margin: 0; padding: 0; }
              table.wrapper {
                width:100% !important;
                table-layout: fixed;
                -webkit-font-smoothing: antialiased;
                -webkit-text-size-adjust: 100%;
                -moz-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
              }
              img.max-width {
                max-width: 100% !important;
              }
              .column.of-2 {
                width: 50%;
              }
              .column.of-3 {
                width: 33.333%;
              }
              .column.of-4 {
                width: 25%;
              }
              @media screen and (max-width:480px) {
                .preheader .rightColumnContent,
                .footer .rightColumnContent {
                    text-align: left !important;
                }
                .preheader .rightColumnContent div,
                .preheader .rightColumnContent span,
                .footer .rightColumnContent div,
                .footer .rightColumnContent span {
                  text-align: left !important;
                }
                .preheader .rightColumnContent,
                .preheader .leftColumnContent {
                  font-size: 80% !important;
                  padding: 5px 0;
                }
                table.wrapper-mobile {
                  width: 100% !important;
                  table-layout: fixed;
                }
                img.max-width {
                  height: auto !important;
                  max-width: 480px !important;
                }
                a.bulletproof-button {
                  display: block !important;
                  width: auto !important;
                  font-size: 80%;
                  padding-left: 0 !important;
                  padding-right: 0 !important;
                }
                .columns {
                  width: 100% !important;
                }
                .column {
                  display: block !important;
                  width: 100% !important;
                  padding-left: 0 !important;
                  padding-right: 0 !important;
                  margin-left: 0 !important;
                  margin-right: 0 !important;
                }
                .total_spacer {
                  padding:0px 0px 0px 0px;
                }
              }
            </style>
            <!--user entered Head Start-->
            
             <!--End Head user entered-->
          </head>
          <body>
            <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size: 14px; font-family: arial; color: #000000; background-color: #ffffff;">
              <div class="webkit">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
                  <tr>
                    <td valign="top" bgcolor="#ffffff" width="100%">
                      <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="100%">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td>
                                  <!--[if mso]>
                                  <center>
                                  <table><tr><td width="600">
                                  <![endif]-->
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                                    <tr>
                                      <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#ffffff" width="100%" align="left">
                                        
            <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
                   style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
              <tr>
                <td role="module-content">
                  <p></p>
                </td>
              </tr>
            </table>
                  
            <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
              <tr>
                <td style="font-size:6px;line-height:10px;padding:15px 0px 0px 0px;" valign="top" align="center">
                  <img border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;width:120px;height:auto !important;" src="https://pleacegolf.world/assets/pleace-golf-circle.png" alt="" width="600">
                </td>
              </tr>
            </table>
        
      
          
            <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
              <tr>
                <td style="padding:20px 15px 30px 15px;line-height:22px;text-align:inherit;"
                    height="100%"
                    valign="top"
                    bgcolor="">
                    <div style="text-align: center;"><span style="color:#333333;">{{params.text}}</span></div>
                </td>
              </tr>
            </table>
          <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" class="outer-td" style="padding:0px 0px 45px 0px"><table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a style="background-color:#014401;border:1px solid #333333;border-color:#014401;border-radius:4px;border-width:1px;color:#ffffff;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding:15px 75px 15px 75px;text-align:center;text-decoration:none" href="{{params.c2aLink}}" target="_blank">{{params.c2aButton}}</a></td></tr></tbody></table></td></tr></tbody></table>
          
            <div style="background-color:#ffffff;color:#7a7a7a;font-size:11px;line-height:20px;padding:0px 0px 15px 0px;text-align:center">
                <p style="font-size:12px;font-weight:400;line-height:24px;padding:0 20px;margin:0;text-align:center">Copyright © 2015-2020, Pleace Awaken / Impressum. All rights reserved.
                </p>
            </div>
        
                                      </td>
                                    </tr>
                                  </table>
                                  <!--[if mso]>
                                  </td></tr></table>
                                  </center>
                                  <![endif]-->
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </center>
          </body>
        </html>`;
    }
    static getCreateInviteeTemplate() {
        return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <style type="text/css">
            body {width: 600px;margin: 0 auto;}
            table {border-collapse: collapse;}
            table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
            img {-ms-interpolation-mode: bicubic;}
          </style>
          <![endif]-->
      
          <style type="text/css">
            body, p, div {
              font-family: arial;
              font-size: 14px;
            }
            body {
              color: #000000;
            }
            body a {
              color: #1188E6;
              text-decoration: none;
            }
            p { margin: 0; padding: 0; }
            table.wrapper {
              width:100% !important;
              table-layout: fixed;
              -webkit-font-smoothing: antialiased;
              -webkit-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
            img.max-width {
              max-width: 100% !important;
            }
            .column.of-2 {
              width: 50%;
            }
            .column.of-3 {
              width: 33.333%;
            }
            .column.of-4 {
              width: 25%;
            }
            @media screen and (max-width:480px) {
              .preheader .rightColumnContent,
              .footer .rightColumnContent {
                  text-align: left !important;
              }
              .preheader .rightColumnContent div,
              .preheader .rightColumnContent span,
              .footer .rightColumnContent div,
              .footer .rightColumnContent span {
                text-align: left !important;
              }
              .preheader .rightColumnContent,
              .preheader .leftColumnContent {
                font-size: 80% !important;
                padding: 5px 0;
              }
              table.wrapper-mobile {
                width: 100% !important;
                table-layout: fixed;
              }
              img.max-width {
                height: auto !important;
                max-width: 480px !important;
              }
              a.bulletproof-button {
                display: block !important;
                width: auto !important;
                font-size: 80%;
                padding-left: 0 !important;
                padding-right: 0 !important;
              }
              .columns {
                width: 100% !important;
              }
              .column {
                display: block !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
              }
              .total_spacer {
                padding:0px 0px 0px 0px;
              }
            }
          </style>
          <!--user entered Head Start-->
          
           <!--End Head user entered-->
        </head>
        <body>
          <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size: 14px; font-family: arial; color: #000000; background-color: #ffffff;">
            <div class="webkit">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
                <tr>
                  <td valign="top" bgcolor="#ffffff" width="100%">
                    <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="100%">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td>
                                <!--[if mso]>
                                <center>
                                <table><tr><td width="600">
                                <![endif]-->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                                  <tr>
                                    <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#ffffff" width="100%" align="left">
                                      
          <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
                 style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
            <tr>
              <td role="module-content">
                <p></p>
              </td>
            </tr>
          </table>
                
          <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td style="font-size:6px;line-height:10px;padding:15px 0px 0px 0px;" valign="top" align="center">
                <img border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;width:120px;height:auto !important;" src="https://pleacegolf.world/assets/pleace-golf-circle.png" alt="" width="600">
              </td>
            </tr>
          </table>
      
          <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td style="padding:35px 45px 10px 45px;line-height:22px;text-align:inherit;"
                  height="100%"
                  valign="top"
                  bgcolor="">
                  <div style="text-align: center;"><strong><span style="color:#3E3E3E;"><span style="font-size:20px;">{{params.header}}</span></span></strong></div>
              </td>
            </tr>
          </table>
        
          <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td style="padding:20px 15px 30px 15px;line-height:22px;text-align:inherit;"
                  height="100%"
                  valign="top"
                  bgcolor="">
                  <div><span style="color:#333333;">Dear Admin , {{params.text}}</span></div>
              </td>
            </tr>
          </table>
        <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%">
        <tbody>
          <tr>
            <td  class="outer-td" style="padding:0px 15px 45px 15px">
              <table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile">
                <tbody>
                <tr>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:40%">
                    Category
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:10px">
                     :
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    {{params.category}} 
                    </td>
                  </tr>
                  <tr>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    Subcategory
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:10px">
                     :
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    {{params.type}} 
                    </td>
                  </tr>
                  <tr>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;">
                    Name
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:10px">
                     :
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    {{params.firstName}} {{params.lastName}} 
                    </td>
                  </tr>
                  
                  <tr>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    Name Known by
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:10px">
                     :
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    {{params.stageName}} 
                    </td>
                  </tr>
                  <tr>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    Country
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:10px">
                     :
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    {{params.country}} 
                    </td>
                  </tr>
                  <tr>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    Requested By
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:10px">
                     :
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    {{params.requestedByName}} ({{params.requestedByEmail}})
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
        </table>
        <div style="text-align:center;">
        <a style="background-color:#014401;border:1px solid #333333;border-color:#014401;border-radius:4px;border-width:1px;color:#ffffff;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding: 15px 30px 15px 30px;text-align:center;text-decoration:none;/* width: 20px; */" href="{{params.c2aLink}}" target="_blank">{{params.c2aButton}}</a>
        </div>
          <div style="background-color:#ffffff;color:#7a7a7a;font-size:11px;line-height:20px;padding:0px 0px 15px 0px;text-align:center">
              <p style="font-size:12px;font-weight:400;line-height:24px;padding:0 20px;margin:0;text-align:center">Copyright © 2015-2022, Pleace Awaken / Impressum. All rights reserved.
              </p>
          </div>
      
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso]>
                                </td></tr></table>
                                </center>
                                <![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </center>
        </body>
      </html>`;
    }
    static getNotifyClubTemplate() {
        return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <style type="text/css">
            body {width: 600px;margin: 0 auto;}
            table {border-collapse: collapse;}
            table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
            img {-ms-interpolation-mode: bicubic;}
          </style>
          <![endif]-->
      
          <style type="text/css">
            body, p, div {
              font-family: arial;
              font-size: 14px;
            }
            body {
              color: #000000;
            }
            body a {
              color: #1188E6;
              text-decoration: none;
            }
            p { margin: 0; padding: 0; }
            table.wrapper {
              width:100% !important;
              table-layout: fixed;
              -webkit-font-smoothing: antialiased;
              -webkit-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
            img.max-width {
              max-width: 100% !important;
            }
            .column.of-2 {
              width: 50%;
            }
            .column.of-3 {
              width: 33.333%;
            }
            .column.of-4 {
              width: 25%;
            }
            @media screen and (max-width:480px) {
              .preheader .rightColumnContent,
              .footer .rightColumnContent {
                  text-align: left !important;
              }
              .preheader .rightColumnContent div,
              .preheader .rightColumnContent span,
              .footer .rightColumnContent div,
              .footer .rightColumnContent span {
                text-align: left !important;
              }
              .preheader .rightColumnContent,
              .preheader .leftColumnContent {
                font-size: 80% !important;
                padding: 5px 0;
              }
              table.wrapper-mobile {
                width: 100% !important;
                table-layout: fixed;
              }
              img.max-width {
                height: auto !important;
                max-width: 480px !important;
              }
              a.bulletproof-button {
                display: block !important;
                width: auto !important;
                font-size: 80%;
                padding-left: 0 !important;
                padding-right: 0 !important;
              }
              .columns {
                width: 100% !important;
              }
              .column {
                display: block !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
              }
              .total_spacer {
                padding:0px 0px 0px 0px;
              }
            }
          </style>
          <!--user entered Head Start-->
          
           <!--End Head user entered-->
        </head>
        <body>
          <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size: 14px; font-family: arial; color: #000000; background-color: #ffffff;">
            <div class="webkit">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
                <tr>
                  <td valign="top" bgcolor="#ffffff" width="100%">
                    <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="100%">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td>
                                <!--[if mso]>
                                <center>
                                <table><tr><td width="600">
                                <![endif]-->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                                  <tr>
                                    <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#ffffff" width="100%" align="left">
                                      
          <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
                 style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
            <tr>
              <td role="module-content">
                <p></p>
              </td>
            </tr>
          </table>
                
          <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td style="font-size:6px;line-height:10px;padding:15px 0px 0px 0px;" valign="top" align="center">
                <img border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;width:120px;height:auto !important;" src="https://pleacegolf.world/assets/pleace-golf-circle.png" alt="" width="600">
              </td>
            </tr>
          </table>
      
          <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td style="padding:35px 45px 10px 45px;line-height:22px;text-align:inherit;"
                  height="100%"
                  valign="top"
                  bgcolor="">
                  <div style="text-align: center;"><strong><span style="color:#3E3E3E;"><span style="font-size:20px;">{{params.header}}</span></span></strong></div>
              </td>
            </tr>
          </table>
        
          <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td style="padding:20px 15px 30px 15px;line-height:22px;text-align:inherit;"
                  height="100%"
                  valign="top"
                  bgcolor="">
                  <div><span style="color:#333333;">{{params.text}}</span></div>
              </td>
            </tr>
          </table>
        <div style="text-align:center;">
        <a style="background-color:#014401;border:1px solid #333333;border-color:#014401;border-radius:4px;border-width:1px;color:#ffffff;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding: 15px 30px 15px 30px;text-align:center;text-decoration:none;/* width: 20px; */" href="{{params.c2aLink}}" target="_blank">{{params.c2aButton}}</a>
        </div>
        <div style="margin:10px 0px">
	        <p>PLeace Golf World is a cross-continental real-time scoring app for financial support of the projects and events of PLeace Awaken. We bring the world together through sport and discussion, to find solutions for humanitarian challenges. We launch Golf development programs, built safe havens and educational facilities for abuse victims and launch community upliftment projects. We use #golf4change. Together we can make a difference!</p>
	      </div>
          <div style="background-color:#ffffff;color:#7a7a7a;font-size:11px;line-height:20px;padding:0px 0px 15px 0px;text-align:center">
              <p style="font-size:12px;font-weight:400;line-height:24px;padding:0 20px;margin:0;text-align:center">Copyright © 2015-2022, Pleace Awaken / Impressum. All rights reserved.
              </p>
          </div>
      
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso]>
                                </td></tr></table>
                                </center>
                                <![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </center>
        </body>
      </html>`;
    }
    static getGolfClubUpdatedTemplate() {
        return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
        <head>
          
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <style type="text/css">
            body {width: 600px;margin: 0 auto;}
            table {border-collapse: collapse;}
            table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
            img {-ms-interpolation-mode: bicubic;}
          </style>
          <![endif]-->
      
          <style type="text/css">
            body, p, div {
              font-family: arial;
              font-size: 14px;
            }
            body {
              color: #000000;
            }
            body a {
              color: #1188E6;
              text-decoration: none;
            }
            p { margin: 0; padding: 0; }
            table.wrapper {
              width:100% !important;
              table-layout: fixed;
              -webkit-font-smoothing: antialiased;
              -webkit-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
            img.max-width {
              max-width: 100% !important;
            }
            .column.of-2 {
              width: 50%;
            }
            .column.of-3 {
              width: 33.333%;
            }
            .column.of-4 {
              width: 25%;
            }
            @media screen and (max-width:480px) {
              .preheader .rightColumnContent,
              .footer .rightColumnContent {
                  text-align: left !important;
              }
              .preheader .rightColumnContent div,
              .preheader .rightColumnContent span,
              .footer .rightColumnContent div,
              .footer .rightColumnContent span {
                text-align: left !important;
              }
              .preheader .rightColumnContent,
              .preheader .leftColumnContent {
                font-size: 80% !important;
                padding: 5px 0;
              }
              table.wrapper-mobile {
                width: 100% !important;
                table-layout: fixed;
              }
              img.max-width {
                height: auto !important;
                max-width: 480px !important;
              }
              a.bulletproof-button {
                display: block !important;
                width: auto !important;
                font-size: 80%;
                padding-left: 0 !important;
                padding-right: 0 !important;
              }
              .columns {
                width: 100% !important;
              }
              .column {
                display: block !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
              }
              .total_spacer {
                padding:0px 0px 0px 0px;
              }
            }
          </style>
          <!--user entered Head Start-->
          
           <!--End Head user entered-->
        </head>
        <body>
          <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size: 14px; font-family: arial; color: #000000; background-color: #ffffff;">
            <div class="webkit">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
                <tr>
                  <td valign="top" bgcolor="#ffffff" width="100%">
                    <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="100%">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td>
                                <!--[if mso]>
                                <center>
                                <table><tr><td width="600">
                                <![endif]-->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                                  <tr>
                                    <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#ffffff" width="100%" align="left">
                                      
          <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td style="padding:35px 45px 10px 45px;line-height:22px;text-align:inherit;"
                  height="100%"
                  valign="top"
                  bgcolor="">
                  <div style="text-align: center;"><strong><span style="color:#3E3E3E;"><span style="font-size:20px;">{{params.header}}</span></span></strong></div>
              </td>
            </tr>
          </table>
        
          <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td style="padding:20px 15px 30px 15px;line-height:22px;text-align:inherit;"
                  height="100%"
                  valign="top"
                  bgcolor="">
                  <div><span style="color:#333333;">Dear User , {{params.text}}</span></div>
              </td>
            </tr>
          </table>
        <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%">
        <tbody>
          <tr>
            <td  class="outer-td" style="padding:0px 15px 45px 15px">
              <table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile">
                <tbody>
                  <tr>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:35%">
                    Club Name
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:20px">
                     -
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    {{params.clubName}} 
                    </td>
                  </tr>
                  <tr>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    Country
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:20px">
                     -
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    {{params.country}} 
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
        </table>
        <div style="text-align:center;">
        <a style="background-color:#014401;border:1px solid #333333;border-color:#014401;border-radius:4px;border-width:1px;color:#ffffff;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding: 15px 30px 15px 30px;text-align:center;text-decoration:none;/* width: 20px; */" href="{{params.c2aLink}}" target="_blank">{{params.c2aButton}}</a>
        </div>
        <div style="margin:10px 0px">
	        <p>PLeace Golf World is a cross-continental real-time scoring app for financial support of the projects and events of PLeace Awaken. We bring the world together through sport and discussion, to find solutions for humanitarian challenges. We launch Golf development programs, built safe havens and educational facilities for abuse victims and launch community upliftment projects. We use #golf4change. Together we can make a difference!</p>
	      </div>
          <div style="background-color:#ffffff;color:#7a7a7a;font-size:11px;line-height:20px;padding:0px 0px 15px 0px;text-align:center">
              <p style="font-size:12px;font-weight:400;line-height:24px;padding:0 20px;margin:0;text-align:center">Copyright © 2015-2022, Pleace Awaken / Impressum. All rights reserved.
              </p>
          </div>
      
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso]>
                                </td></tr></table>
                                </center>
                                <![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </center>
        </body>
      </html>`;
    }
    static getNeedHelpTemplate() {
        return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
        <head>
          
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <style type="text/css">
            body {width: 600px;margin: 0 auto;}
            table {border-collapse: collapse;}
            table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
            img {-ms-interpolation-mode: bicubic;}
          </style>
          <![endif]-->
      
          <style type="text/css">
            body, p, div {
              font-family: arial;
              font-size: 14px;
            }
            body {
              color: #000000;
            }
            body a {
              color: #1188E6;
              text-decoration: none;
            }
            p { margin: 0; padding: 0; }
            table.wrapper {
              width:100% !important;
              table-layout: fixed;
              -webkit-font-smoothing: antialiased;
              -webkit-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
            img.max-width {
              max-width: 100% !important;
            }
            .column.of-2 {
              width: 50%;
            }
            .column.of-3 {
              width: 33.333%;
            }
            .column.of-4 {
              width: 25%;
            }
            @media screen and (max-width:480px) {
              .preheader .rightColumnContent,
              .footer .rightColumnContent {
                  text-align: left !important;
              }
              .preheader .rightColumnContent div,
              .preheader .rightColumnContent span,
              .footer .rightColumnContent div,
              .footer .rightColumnContent span {
                text-align: left !important;
              }
              .preheader .rightColumnContent,
              .preheader .leftColumnContent {
                font-size: 80% !important;
                padding: 5px 0;
              }
              table.wrapper-mobile {
                width: 100% !important;
                table-layout: fixed;
              }
              img.max-width {
                height: auto !important;
                max-width: 480px !important;
              }
              a.bulletproof-button {
                display: block !important;
                width: auto !important;
                font-size: 80%;
                padding-left: 0 !important;
                padding-right: 0 !important;
              }
              .columns {
                width: 100% !important;
              }
              .column {
                display: block !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
              }
              .total_spacer {
                padding:0px 0px 0px 0px;
              }
            }
          </style>
          <!--user entered Head Start-->
          
           <!--End Head user entered-->
        </head>
        <body>
          <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size: 14px; font-family: arial; color: #000000; background-color: #ffffff;">
            <div class="webkit">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
                <tr>
                  <td valign="top" bgcolor="#ffffff" width="100%">
                    <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="100%">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td>
                                <!--[if mso]>
                                <center>
                                <table><tr><td width="600">
                                <![endif]-->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                                  <tr>
                                    <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#ffffff" width="100%" align="left">
                                      
          <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td style="padding:35px 45px 10px 45px;line-height:22px;text-align:inherit;"
                  height="100%"
                  valign="top"
                  bgcolor="">
                  <div style="text-align: center;"><strong><span style="color:#3E3E3E;"><span style="font-size:20px;">{{params.header}}</span></span></strong></div>
              </td>
            </tr>
          </table>
        
          <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td style="padding:20px 15px 30px 15px;line-height:22px;text-align:inherit;"
                  height="100%"
                  valign="top"
                  bgcolor="">
                  <div><span style="color:#333333;">Dear Admin , {{params.text}}</span></div>
              </td>
            </tr>
          </table>
        <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%">
        <tbody>
          <tr>
            <td  class="outer-td" style="padding:0px 15px 45px 15px">
              <table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile">
                <tbody>
                  <tr>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:35%">
                    Club Name
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:20px">
                     -
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    {{params.clubName}} 
                    </td>
                  </tr>
                  <tr>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    Country
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:20px">
                     -
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    {{params.country}} 
                    </td>
                  </tr>
                  <tr>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    Regarding
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:20px">
                     -
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    {{params.regarding}} 
                    </td>
                  </tr>
                  <tr>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    Issue Details
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:20px">
                     -
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    {{params.details}} 
                    </td>
                  </tr>
                  
                  <tr>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    Request by
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit;width:20px">
                     -
                    </td>
                    <td  bgcolor="#014401" class="inner-td" style="border-radius:6px;font-size:16px;background-color:inherit">
                    {{params.requestedByName}} ( {{params.requestedByEmail}} ) 
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
        </table>
        <div style="text-align:center;">
        <a style="background-color:#014401;border:1px solid #333333;border-color:#014401;border-radius:4px;border-width:1px;color:#ffffff;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding: 15px 30px 15px 30px;text-align:center;text-decoration:none;/* width: 20px; */" href="{{params.c2aLink}}" target="_blank">{{params.c2aButton}}</a>
        </div>
          <div style="background-color:#ffffff;color:#7a7a7a;font-size:11px;line-height:20px;padding:0px 0px 15px 0px;text-align:center">
              <p style="font-size:12px;font-weight:400;line-height:24px;padding:0 20px;margin:0;text-align:center">Copyright © 2015-2022, Pleace Awaken / Impressum. All rights reserved.
              </p>
          </div>
      
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso]>
                                </td></tr></table>
                                </center>
                                <![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </center>
        </body>
      </html>`;
    }
    static getHelpSupportTemplate() {
        return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
        <head>
          
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <style type="text/css">
            body {width: 600px;margin: 0 auto;}
            table {border-collapse: collapse;}
            table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
            img {-ms-interpolation-mode: bicubic;}
          </style>
          <![endif]-->
      
          <style type="text/css">
            body, p, div {
              font-family: arial;
              font-size: 14px;
            }
            body {
              color: #000000;
            }
            body a {
              color: #1188E6;
              text-decoration: none;
            }
            p { margin: 0; padding: 0; }
            table.wrapper {
              width:100% !important;
              table-layout: fixed;
              -webkit-font-smoothing: antialiased;
              -webkit-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
            img.max-width {
              max-width: 100% !important;
            }
            .column.of-2 {
              width: 50%;
            }
            .column.of-3 {
              width: 33.333%;
            }
            .column.of-4 {
              width: 25%;
            }
            @media screen and (max-width:480px) {
              .preheader .rightColumnContent,
              .footer .rightColumnContent {
                  text-align: left !important;
              }
              .preheader .rightColumnContent div,
              .preheader .rightColumnContent span,
              .footer .rightColumnContent div,
              .footer .rightColumnContent span {
                text-align: left !important;
              }
              .preheader .rightColumnContent,
              .preheader .leftColumnContent {
                font-size: 80% !important;
                padding: 5px 0;
              }
              table.wrapper-mobile {
                width: 100% !important;
                table-layout: fixed;
              }
              img.max-width {
                height: auto !important;
                max-width: 480px !important;
              }
              a.bulletproof-button {
                display: block !important;
                width: auto !important;
                font-size: 80%;
                padding-left: 0 !important;
                padding-right: 0 !important;
              }
              .columns {
                width: 100% !important;
              }
              .column {
                display: block !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
              }
              .total_spacer {
                padding:0px 0px 0px 0px;
              }
            }
          </style>
          <!--user entered Head Start-->
          
           <!--End Head user entered-->
        </head>
        <body>
          <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size: 14px; font-family: arial; color: #000000; background-color: #ffffff;">
            <div class="webkit">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
                <tr>
                  <td valign="top" bgcolor="#ffffff" width="100%">
                    <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="100%">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td>
                                <!--[if mso]>
                                <center>
                                <table><tr><td width="600">
                                <![endif]-->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                                  <tr>
                                    <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#ffffff" width="100%" align="left">
                                      
          <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td style="padding:35px 45px 10px 45px;line-height:22px;text-align:inherit;"
                  height="100%"
                  valign="top"
                  bgcolor="">
                  <div style="text-align: center;"><strong><span style="color:#3E3E3E;"><span style="font-size:20px;">{{params.header}}</span></span></strong></div>
              </td>
            </tr>
          </table>
        
          <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td style="padding:20px 15px 30px 15px;line-height:22px;text-align:inherit;"
                  height="100%"
                  valign="top"
                  bgcolor="">
                  <div><span style="color:#333333;">Dear Admin , <br/> {{params.text}}</span></div>
            <br/>
            <div><span style="color:#333333;font-size:16px;">Requested By  - {{params.requestedByName}} ( {{params.requestedByEmail}} ) </span></div>
              </td>
            </tr>
          </table>
          <div style="background-color:#ffffff;color:#7a7a7a;font-size:11px;line-height:20px;padding:0px 0px 15px 0px;text-align:center">
              <p style="font-size:12px;font-weight:400;line-height:24px;padding:0 20px;margin:0;text-align:center">Copyright © 2015-2022, Pleace Awaken / Impressum. All rights reserved.
              </p>
          </div>
      
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso]>
                                </td></tr></table>
                                </center>
                                <![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </center>
        </body>
      </html>`;
    }
}
exports.EmailHtmlTemplate = EmailHtmlTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtaHRtbC10ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL2VtYWlsL2VtYWlsLWh0bWwtdGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxpQkFBaUI7SUFFbkIsTUFBTSxDQUFDLHFCQUFxQjtRQUMvQixPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBdUxDLENBQUM7SUFDYixDQUFDO0lBRU0sTUFBTSxDQUFDLHdCQUF3QjtRQUNwQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztjQWdSQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxxQkFBcUI7UUFDakMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2NBbU1DLENBQUM7SUFDWCxDQUFDO0lBRU0sTUFBTSxDQUFDLDBCQUEwQjtRQUN0QyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2NBc05DLENBQUM7SUFDWCxDQUFDO0lBQ00sTUFBTSxDQUFDLG1CQUFtQjtRQUMvQixPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2NBb1BDLENBQUM7SUFDWCxDQUFDO0lBRU0sTUFBTSxDQUFDLHNCQUFzQjtRQUNsQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2NBK0tDLENBQUM7SUFDWCxDQUFDO0NBRUo7QUE1eENELDhDQTR4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRW1haWxIdG1sVGVtcGxhdGUge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UGxlYWNlR29sZlRlbXBsYXRlKCkge1xyXG4gICAgICAgIHJldHVybiBgPCFET0NUWVBFIGh0bWwgUFVCTElDIFwiLS8vVzNDLy9EVEQgWEhUTUwgMS4wIFN0cmljdC8vRU5cIiBcImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXN0cmljdC5kdGRcIj5cclxuICAgICAgICA8aHRtbCBkYXRhLWVkaXRvci12ZXJzaW9uPVwiMlwiIGNsYXNzPVwic2ctY2FtcGFpZ25zXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI+XHJcbiAgICAgICAgICA8aGVhZD5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJDb250ZW50LVR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04XCIgLz5cclxuICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLCBtaW5pbXVtLXNjYWxlPTEsIG1heGltdW0tc2NhbGU9MVwiIC8+PCEtLVtpZiAhbXNvXT48IS0tPlxyXG4gICAgICAgICAgICA8bWV0YSBodHRwLWVxdWl2PVwiWC1VQS1Db21wYXRpYmxlXCIgY29udGVudD1cIklFPUVkZ2VcIiAvPjwhLS08IVtlbmRpZl0tLT5cclxuICAgICAgICAgICAgPCEtLVtpZiAoZ3RlIG1zbyA5KXwoSUUpXT5cclxuICAgICAgICAgICAgPHhtbD5cclxuICAgICAgICAgICAgPG86T2ZmaWNlRG9jdW1lbnRTZXR0aW5ncz5cclxuICAgICAgICAgICAgPG86QWxsb3dQTkcvPlxyXG4gICAgICAgICAgICA8bzpQaXhlbHNQZXJJbmNoPjk2PC9vOlBpeGVsc1BlckluY2g+XHJcbiAgICAgICAgICAgIDwvbzpPZmZpY2VEb2N1bWVudFNldHRpbmdzPlxyXG4gICAgICAgICAgICA8L3htbD5cclxuICAgICAgICAgICAgPCFbZW5kaWZdLS0+XHJcbiAgICAgICAgICAgIDwhLS1baWYgKGd0ZSBtc28gOSl8KElFKV0+XHJcbiAgICAgICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cclxuICAgICAgICAgICAgICBib2R5IHt3aWR0aDogNjAwcHg7bWFyZ2luOiAwIGF1dG87fVxyXG4gICAgICAgICAgICAgIHRhYmxlIHtib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO31cclxuICAgICAgICAgICAgICB0YWJsZSwgdGQge21zby10YWJsZS1sc3BhY2U6IDBwdDttc28tdGFibGUtcnNwYWNlOiAwcHQ7fVxyXG4gICAgICAgICAgICAgIGltZyB7LW1zLWludGVycG9sYXRpb24tbW9kZTogYmljdWJpYzt9XHJcbiAgICAgICAgICAgIDwvc3R5bGU+XHJcbiAgICAgICAgICAgIDwhW2VuZGlmXS0tPlxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICA8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XHJcbiAgICAgICAgICAgICAgYm9keSwgcCwgZGl2IHtcclxuICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBhcmlhbDtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYm9keSB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogIzAwMDAwMDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYm9keSBhIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAjMTE4OEU2O1xyXG4gICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBwIHsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyB9XHJcbiAgICAgICAgICAgICAgdGFibGUud3JhcHBlciB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDoxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xyXG4gICAgICAgICAgICAgICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XHJcbiAgICAgICAgICAgICAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XHJcbiAgICAgICAgICAgICAgICAtbW96LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XHJcbiAgICAgICAgICAgICAgICAtbXMtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaW1nLm1heC13aWR0aCB7XHJcbiAgICAgICAgICAgICAgICBtYXgtd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLmNvbHVtbi5vZi0yIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MCU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC5jb2x1bW4ub2YtMyB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzMuMzMzJTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLmNvbHVtbi5vZi00IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyNSU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NDgwcHgpIHtcclxuICAgICAgICAgICAgICAgIC5wcmVoZWFkZXIgLnJpZ2h0Q29sdW1uQ29udGVudCxcclxuICAgICAgICAgICAgICAgIC5mb290ZXIgLnJpZ2h0Q29sdW1uQ29udGVudCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLnByZWhlYWRlciAucmlnaHRDb2x1bW5Db250ZW50IGRpdixcclxuICAgICAgICAgICAgICAgIC5wcmVoZWFkZXIgLnJpZ2h0Q29sdW1uQ29udGVudCBzcGFuLFxyXG4gICAgICAgICAgICAgICAgLmZvb3RlciAucmlnaHRDb2x1bW5Db250ZW50IGRpdixcclxuICAgICAgICAgICAgICAgIC5mb290ZXIgLnJpZ2h0Q29sdW1uQ29udGVudCBzcGFuIHtcclxuICAgICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLnByZWhlYWRlciAucmlnaHRDb2x1bW5Db250ZW50LFxyXG4gICAgICAgICAgICAgICAgLnByZWhlYWRlciAubGVmdENvbHVtbkNvbnRlbnQge1xyXG4gICAgICAgICAgICAgICAgICBmb250LXNpemU6IDgwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiA1cHggMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRhYmxlLndyYXBwZXItbW9iaWxlIHtcclxuICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgICAgdGFibGUtbGF5b3V0OiBmaXhlZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGltZy5tYXgtd2lkdGgge1xyXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgICAgbWF4LXdpZHRoOiA0ODBweCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYS5idWxsZXRwcm9vZi1idXR0b24ge1xyXG4gICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgICB3aWR0aDogYXV0byAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgICBmb250LXNpemU6IDgwJTtcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAwICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC5jb2x1bW5zIHtcclxuICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC5jb2x1bW4ge1xyXG4gICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC50b3RhbF9zcGFjZXIge1xyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOjBweCAwcHggMHB4IDBweDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvc3R5bGU+XHJcbiAgICAgICAgICAgIDwhLS11c2VyIGVudGVyZWQgSGVhZCBTdGFydC0tPlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgIDwhLS1FbmQgSGVhZCB1c2VyIGVudGVyZWQtLT5cclxuICAgICAgICAgIDwvaGVhZD5cclxuICAgICAgICAgIDxib2R5PlxyXG4gICAgICAgICAgICA8Y2VudGVyIGNsYXNzPVwid3JhcHBlclwiIGRhdGEtbGluay1jb2xvcj1cIiMxMTg4RTZcIiBkYXRhLWJvZHktc3R5bGU9XCJmb250LXNpemU6IDE0cHg7IGZvbnQtZmFtaWx5OiBhcmlhbDsgY29sb3I6ICMwMDAwMDA7IGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlYmtpdFwiPlxyXG4gICAgICAgICAgICAgICAgPHRhYmxlIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGJvcmRlcj1cIjBcIiB3aWR0aD1cIjEwMCVcIiBjbGFzcz1cIndyYXBwZXJcIiBiZ2NvbG9yPVwiI2ZmZmZmZlwiPlxyXG4gICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIHZhbGlnbj1cInRvcFwiIGJnY29sb3I9XCIjZmZmZmZmXCIgd2lkdGg9XCIxMDAlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgd2lkdGg9XCIxMDAlXCIgcm9sZT1cImNvbnRlbnQtY29udGFpbmVyXCIgY2xhc3M9XCJvdXRlclwiIGFsaWduPVwiY2VudGVyXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgYm9yZGVyPVwiMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHdpZHRoPVwiMTAwJVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIHdpZHRoPVwiMTAwJVwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGJvcmRlcj1cIjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1baWYgbXNvXT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjZW50ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGU+PHRyPjx0ZCB3aWR0aD1cIjYwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCFbZW5kaWZdLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgd2lkdGg9XCIxMDAlXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgYm9yZGVyPVwiMFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IG1heC13aWR0aDo2MDBweDtcIiBhbGlnbj1cImNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHJvbGU9XCJtb2R1bGVzLWNvbnRhaW5lclwiIHN0eWxlPVwicGFkZGluZzogMHB4IDBweCAwcHggMHB4OyBjb2xvcjogIzAwMDAwMDsgdGV4dC1hbGlnbjogbGVmdDtcIiBiZ2NvbG9yPVwiI2ZmZmZmZlwiIHdpZHRoPVwiMTAwJVwiIGFsaWduPVwibGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cIm1vZHVsZSBwcmVoZWFkZXIgcHJlaGVhZGVyLWhpZGVcIiByb2xlPVwibW9kdWxlXCIgZGF0YS10eXBlPVwicHJlaGVhZGVyXCIgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHdpZHRoPVwiMTAwJVwiXHJcbiAgICAgICAgICAgICAgICAgICBzdHlsZT1cImRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgbXNvLWhpZGU6IGFsbDsgdmlzaWJpbGl0eTogaGlkZGVuOyBvcGFjaXR5OiAwOyBjb2xvcjogdHJhbnNwYXJlbnQ7IGhlaWdodDogMDsgd2lkdGg6IDA7XCI+XHJcbiAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgPHRkIHJvbGU9XCJtb2R1bGUtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICA8cD48L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ3cmFwcGVyXCIgcm9sZT1cIm1vZHVsZVwiIGRhdGEtdHlwZT1cImltYWdlXCIgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHdpZHRoPVwiMTAwJVwiIHN0eWxlPVwidGFibGUtbGF5b3V0OiBmaXhlZDtcIj5cclxuICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQgc3R5bGU9XCJmb250LXNpemU6NnB4O2xpbmUtaGVpZ2h0OjEwcHg7cGFkZGluZzoxNXB4IDBweCAwcHggMHB4O1wiIHZhbGlnbj1cInRvcFwiIGFsaWduPVwiY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWcgYm9yZGVyPVwiMFwiIHN0eWxlPVwiZGlzcGxheTpibG9jaztjb2xvcjojMDAwMDAwO3RleHQtZGVjb3JhdGlvbjpub25lO2ZvbnQtZmFtaWx5OkhlbHZldGljYSwgYXJpYWwsIHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7d2lkdGg6MTIwcHg7aGVpZ2h0OmF1dG8gIWltcG9ydGFudDtcIiBzcmM9XCJodHRwczovL3BsZWFjZWdvbGYud29ybGQvYXNzZXRzL3BsZWFjZS1nb2xmLWNpcmNsZS5wbmdcIiBhbHQ9XCJcIiB3aWR0aD1cIjYwMFwiPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgIFxyXG4gICAgICBcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJtb2R1bGVcIiByb2xlPVwibW9kdWxlXCIgZGF0YS10eXBlPVwidGV4dFwiIGJvcmRlcj1cIjBcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiB3aWR0aD1cIjEwMCVcIiBzdHlsZT1cInRhYmxlLWxheW91dDogZml4ZWQ7XCI+XHJcbiAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzoyMHB4IDE1cHggMzBweCAxNXB4O2xpbmUtaGVpZ2h0OjIycHg7dGV4dC1hbGlnbjppbmhlcml0O1wiXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTAwJVwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWduPVwidG9wXCJcclxuICAgICAgICAgICAgICAgICAgICBiZ2NvbG9yPVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjtcIj48c3BhbiBzdHlsZT1cImNvbG9yOiMzMzMzMzM7XCI+e3twYXJhbXMudGV4dH19PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgPHRhYmxlIGJvcmRlcj1cIjBcIiBjZWxsUGFkZGluZz1cIjBcIiBjZWxsU3BhY2luZz1cIjBcIiBjbGFzcz1cIm1vZHVsZVwiIGRhdGEtcm9sZT1cIm1vZHVsZS1idXR0b25cIiBkYXRhLXR5cGU9XCJidXR0b25cIiByb2xlPVwibW9kdWxlXCIgc3R5bGU9XCJ0YWJsZS1sYXlvdXQ6Zml4ZWRcIiB3aWR0aD1cIjEwMCVcIj48dGJvZHk+PHRyPjx0ZCBhbGlnbj1cImNlbnRlclwiIGNsYXNzPVwib3V0ZXItdGRcIiBzdHlsZT1cInBhZGRpbmc6MHB4IDBweCA0NXB4IDBweFwiPjx0YWJsZSBib3JkZXI9XCIwXCIgY2VsbFBhZGRpbmc9XCIwXCIgY2VsbFNwYWNpbmc9XCIwXCIgY2xhc3M9XCJidXR0b24tY3NzX19kZWVwLXRhYmxlX19fMk9aeWIgd3JhcHBlci1tb2JpbGVcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyXCI+PHRib2R5Pjx0cj48dGQgYWxpZ249XCJjZW50ZXJcIiBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6aW5oZXJpdFwiPjxhIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjojMDE0NDAxO2JvcmRlcjoxcHggc29saWQgIzMzMzMzMztib3JkZXItY29sb3I6IzAxNDQwMTtib3JkZXItcmFkaXVzOjRweDtib3JkZXItd2lkdGg6MXB4O2NvbG9yOiNmZmZmZmY7ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC1mYW1pbHk6YXJpYWwsaGVsdmV0aWNhLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6bm9ybWFsO2xldHRlci1zcGFjaW5nOjBweDtsaW5lLWhlaWdodDoxNnB4O3BhZGRpbmc6MTVweCA3NXB4IDE1cHggNzVweDt0ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWRlY29yYXRpb246bm9uZVwiIGhyZWY9XCJ7e3BhcmFtcy5jMmFMaW5rfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj57e3BhcmFtcy5jMmFCdXR0b259fTwvYT48L3RkPjwvdHI+PC90Ym9keT48L3RhYmxlPjwvdGQ+PC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6I2ZmZmZmZjtjb2xvcjojN2E3YTdhO2ZvbnQtc2l6ZToxMXB4O2xpbmUtaGVpZ2h0OjIwcHg7cGFkZGluZzowcHggMHB4IDE1cHggMHB4O3RleHQtYWxpZ246Y2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBzdHlsZT1cImZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoyNHB4O3BhZGRpbmc6MCAyMHB4O21hcmdpbjowO3RleHQtYWxpZ246Y2VudGVyXCI+Q29weXJpZ2h0IMKpIDIwMTUtMjAyMCwgUGxlYWNlIEF3YWtlbiAvIEltcHJlc3N1bS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tW2lmIG1zb10+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPjwvdHI+PC90YWJsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvY2VudGVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCFbZW5kaWZdLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvY2VudGVyPlxyXG4gICAgICAgICAgPC9ib2R5PlxyXG4gICAgICAgIDwvaHRtbD5gO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q3JlYXRlSW52aXRlZVRlbXBsYXRlKCkge1xyXG4gICAgICByZXR1cm4gYDwhRE9DVFlQRSBodG1sIFBVQkxJQyBcIi0vL1czQy8vRFREIFhIVE1MIDEuMCBTdHJpY3QvL0VOXCIgXCJodHRwOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvRFREL3hodG1sMS1zdHJpY3QuZHRkXCI+XHJcbiAgICAgIDxodG1sIGRhdGEtZWRpdG9yLXZlcnNpb249XCIyXCIgY2xhc3M9XCJzZy1jYW1wYWlnbnNcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIj5cclxuICAgICAgICA8aGVhZD5cclxuICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJDb250ZW50LVR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04XCIgLz5cclxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSwgbWluaW11bS1zY2FsZT0xLCBtYXhpbXVtLXNjYWxlPTFcIiAvPjwhLS1baWYgIW1zb10+PCEtLT5cclxuICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiSUU9RWRnZVwiIC8+PCEtLTwhW2VuZGlmXS0tPlxyXG4gICAgICAgICAgPCEtLVtpZiAoZ3RlIG1zbyA5KXwoSUUpXT5cclxuICAgICAgICAgIDx4bWw+XHJcbiAgICAgICAgICA8bzpPZmZpY2VEb2N1bWVudFNldHRpbmdzPlxyXG4gICAgICAgICAgPG86QWxsb3dQTkcvPlxyXG4gICAgICAgICAgPG86UGl4ZWxzUGVySW5jaD45NjwvbzpQaXhlbHNQZXJJbmNoPlxyXG4gICAgICAgICAgPC9vOk9mZmljZURvY3VtZW50U2V0dGluZ3M+XHJcbiAgICAgICAgICA8L3htbD5cclxuICAgICAgICAgIDwhW2VuZGlmXS0tPlxyXG4gICAgICAgICAgPCEtLVtpZiAoZ3RlIG1zbyA5KXwoSUUpXT5cclxuICAgICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cclxuICAgICAgICAgICAgYm9keSB7d2lkdGg6IDYwMHB4O21hcmdpbjogMCBhdXRvO31cclxuICAgICAgICAgICAgdGFibGUge2JvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7fVxyXG4gICAgICAgICAgICB0YWJsZSwgdGQge21zby10YWJsZS1sc3BhY2U6IDBwdDttc28tdGFibGUtcnNwYWNlOiAwcHQ7fVxyXG4gICAgICAgICAgICBpbWcgey1tcy1pbnRlcnBvbGF0aW9uLW1vZGU6IGJpY3ViaWM7fVxyXG4gICAgICAgICAgPC9zdHlsZT5cclxuICAgICAgICAgIDwhW2VuZGlmXS0tPlxyXG4gICAgICBcclxuICAgICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cclxuICAgICAgICAgICAgYm9keSwgcCwgZGl2IHtcclxuICAgICAgICAgICAgICBmb250LWZhbWlseTogYXJpYWw7XHJcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJvZHkge1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAjMDAwMDAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJvZHkgYSB7XHJcbiAgICAgICAgICAgICAgY29sb3I6ICMxMTg4RTY7XHJcbiAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHAgeyBtYXJnaW46IDA7IHBhZGRpbmc6IDA7IH1cclxuICAgICAgICAgICAgdGFibGUud3JhcHBlciB7XHJcbiAgICAgICAgICAgICAgd2lkdGg6MTAwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XHJcbiAgICAgICAgICAgICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XHJcbiAgICAgICAgICAgICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xyXG4gICAgICAgICAgICAgIC1tb3otdGV4dC1zaXplLWFkanVzdDogMTAwJTtcclxuICAgICAgICAgICAgICAtbXMtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbWcubWF4LXdpZHRoIHtcclxuICAgICAgICAgICAgICBtYXgtd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAuY29sdW1uLm9mLTIge1xyXG4gICAgICAgICAgICAgIHdpZHRoOiA1MCU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLmNvbHVtbi5vZi0zIHtcclxuICAgICAgICAgICAgICB3aWR0aDogMzMuMzMzJTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAuY29sdW1uLm9mLTQge1xyXG4gICAgICAgICAgICAgIHdpZHRoOiAyNSU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo0ODBweCkge1xyXG4gICAgICAgICAgICAgIC5wcmVoZWFkZXIgLnJpZ2h0Q29sdW1uQ29udGVudCxcclxuICAgICAgICAgICAgICAuZm9vdGVyIC5yaWdodENvbHVtbkNvbnRlbnQge1xyXG4gICAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC5wcmVoZWFkZXIgLnJpZ2h0Q29sdW1uQ29udGVudCBkaXYsXHJcbiAgICAgICAgICAgICAgLnByZWhlYWRlciAucmlnaHRDb2x1bW5Db250ZW50IHNwYW4sXHJcbiAgICAgICAgICAgICAgLmZvb3RlciAucmlnaHRDb2x1bW5Db250ZW50IGRpdixcclxuICAgICAgICAgICAgICAuZm9vdGVyIC5yaWdodENvbHVtbkNvbnRlbnQgc3BhbiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC5wcmVoZWFkZXIgLnJpZ2h0Q29sdW1uQ29udGVudCxcclxuICAgICAgICAgICAgICAucHJlaGVhZGVyIC5sZWZ0Q29sdW1uQ29udGVudCB7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDgwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogNXB4IDA7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRhYmxlLndyYXBwZXItbW9iaWxlIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpbWcubWF4LXdpZHRoIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogYXV0byAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgbWF4LXdpZHRoOiA0ODBweCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBhLmJ1bGxldHByb29mLWJ1dHRvbiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGF1dG8gIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogODAlO1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAwICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC5jb2x1bW5zIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC5jb2x1bW4ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLnRvdGFsX3NwYWNlciB7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjBweCAwcHggMHB4IDBweDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIDwvc3R5bGU+XHJcbiAgICAgICAgICA8IS0tdXNlciBlbnRlcmVkIEhlYWQgU3RhcnQtLT5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgIDwhLS1FbmQgSGVhZCB1c2VyIGVudGVyZWQtLT5cclxuICAgICAgICA8L2hlYWQ+XHJcbiAgICAgICAgPGJvZHk+XHJcbiAgICAgICAgICA8Y2VudGVyIGNsYXNzPVwid3JhcHBlclwiIGRhdGEtbGluay1jb2xvcj1cIiMxMTg4RTZcIiBkYXRhLWJvZHktc3R5bGU9XCJmb250LXNpemU6IDE0cHg7IGZvbnQtZmFtaWx5OiBhcmlhbDsgY29sb3I6ICMwMDAwMDA7IGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWJraXRcIj5cclxuICAgICAgICAgICAgICA8dGFibGUgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgYm9yZGVyPVwiMFwiIHdpZHRoPVwiMTAwJVwiIGNsYXNzPVwid3JhcHBlclwiIGJnY29sb3I9XCIjZmZmZmZmXCI+XHJcbiAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCB2YWxpZ249XCJ0b3BcIiBiZ2NvbG9yPVwiI2ZmZmZmZlwiIHdpZHRoPVwiMTAwJVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSB3aWR0aD1cIjEwMCVcIiByb2xlPVwiY29udGVudC1jb250YWluZXJcIiBjbGFzcz1cIm91dGVyXCIgYWxpZ249XCJjZW50ZXJcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBib3JkZXI9XCIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCB3aWR0aD1cIjEwMCVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgd2lkdGg9XCIxMDAlXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgYm9yZGVyPVwiMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLVtpZiBtc29dPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjZW50ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlPjx0cj48dGQgd2lkdGg9XCI2MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IVtlbmRpZl0tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgd2lkdGg9XCIxMDAlXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgYm9yZGVyPVwiMFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IG1heC13aWR0aDo2MDBweDtcIiBhbGlnbj1cImNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgcm9sZT1cIm1vZHVsZXMtY29udGFpbmVyXCIgc3R5bGU9XCJwYWRkaW5nOiAwcHggMHB4IDBweCAwcHg7IGNvbG9yOiAjMDAwMDAwOyB0ZXh0LWFsaWduOiBsZWZ0O1wiIGJnY29sb3I9XCIjZmZmZmZmXCIgd2lkdGg9XCIxMDAlXCIgYWxpZ249XCJsZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICA8dGFibGUgY2xhc3M9XCJtb2R1bGUgcHJlaGVhZGVyIHByZWhlYWRlci1oaWRlXCIgcm9sZT1cIm1vZHVsZVwiIGRhdGEtdHlwZT1cInByZWhlYWRlclwiIGJvcmRlcj1cIjBcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiB3aWR0aD1cIjEwMCVcIlxyXG4gICAgICAgICAgICAgICAgIHN0eWxlPVwiZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyBtc28taGlkZTogYWxsOyB2aXNpYmlsaXR5OiBoaWRkZW47IG9wYWNpdHk6IDA7IGNvbG9yOiB0cmFuc3BhcmVudDsgaGVpZ2h0OiAwOyB3aWR0aDogMDtcIj5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgIDx0ZCByb2xlPVwibW9kdWxlLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgIDxwPjwvcD5cclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgPHRhYmxlIGNsYXNzPVwid3JhcHBlclwiIHJvbGU9XCJtb2R1bGVcIiBkYXRhLXR5cGU9XCJpbWFnZVwiIGJvcmRlcj1cIjBcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiB3aWR0aD1cIjEwMCVcIiBzdHlsZT1cInRhYmxlLWxheW91dDogZml4ZWQ7XCI+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICA8dGQgc3R5bGU9XCJmb250LXNpemU6NnB4O2xpbmUtaGVpZ2h0OjEwcHg7cGFkZGluZzoxNXB4IDBweCAwcHggMHB4O1wiIHZhbGlnbj1cInRvcFwiIGFsaWduPVwiY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIGJvcmRlcj1cIjBcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2s7Y29sb3I6IzAwMDAwMDt0ZXh0LWRlY29yYXRpb246bm9uZTtmb250LWZhbWlseTpIZWx2ZXRpY2EsIGFyaWFsLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O3dpZHRoOjEyMHB4O2hlaWdodDphdXRvICFpbXBvcnRhbnQ7XCIgc3JjPVwiaHR0cHM6Ly9wbGVhY2Vnb2xmLndvcmxkL2Fzc2V0cy9wbGVhY2UtZ29sZi1jaXJjbGUucG5nXCIgYWx0PVwiXCIgd2lkdGg9XCI2MDBcIj5cclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgXHJcbiAgICAgICAgICA8dGFibGUgY2xhc3M9XCJtb2R1bGVcIiByb2xlPVwibW9kdWxlXCIgZGF0YS10eXBlPVwidGV4dFwiIGJvcmRlcj1cIjBcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiB3aWR0aD1cIjEwMCVcIiBzdHlsZT1cInRhYmxlLWxheW91dDogZml4ZWQ7XCI+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjM1cHggNDVweCAxMHB4IDQ1cHg7bGluZS1oZWlnaHQ6MjJweDt0ZXh0LWFsaWduOmluaGVyaXQ7XCJcclxuICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTAwJVwiXHJcbiAgICAgICAgICAgICAgICAgIHZhbGlnbj1cInRvcFwiXHJcbiAgICAgICAgICAgICAgICAgIGJnY29sb3I9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjtcIj48c3Ryb25nPjxzcGFuIHN0eWxlPVwiY29sb3I6IzNFM0UzRTtcIj48c3BhbiBzdHlsZT1cImZvbnQtc2l6ZToyMHB4O1wiPnt7cGFyYW1zLmhlYWRlcn19PC9zcGFuPjwvc3Bhbj48L3N0cm9uZz48L2Rpdj5cclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICBcclxuICAgICAgICAgIDx0YWJsZSBjbGFzcz1cIm1vZHVsZVwiIHJvbGU9XCJtb2R1bGVcIiBkYXRhLXR5cGU9XCJ0ZXh0XCIgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHdpZHRoPVwiMTAwJVwiIHN0eWxlPVwidGFibGUtbGF5b3V0OiBmaXhlZDtcIj5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6MjBweCAxNXB4IDMwcHggMTVweDtsaW5lLWhlaWdodDoyMnB4O3RleHQtYWxpZ246aW5oZXJpdDtcIlxyXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIxMDAlXCJcclxuICAgICAgICAgICAgICAgICAgdmFsaWduPVwidG9wXCJcclxuICAgICAgICAgICAgICAgICAgYmdjb2xvcj1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2PjxzcGFuIHN0eWxlPVwiY29sb3I6IzMzMzMzMztcIj5EZWFyIEFkbWluICwge3twYXJhbXMudGV4dH19PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgIDx0YWJsZSBib3JkZXI9XCIwXCIgY2VsbFBhZGRpbmc9XCIwXCIgY2VsbFNwYWNpbmc9XCIwXCIgY2xhc3M9XCJtb2R1bGVcIiBkYXRhLXJvbGU9XCJtb2R1bGUtYnV0dG9uXCIgZGF0YS10eXBlPVwiYnV0dG9uXCIgcm9sZT1cIm1vZHVsZVwiIHN0eWxlPVwidGFibGUtbGF5b3V0OmZpeGVkXCIgd2lkdGg9XCIxMDAlXCI+XHJcbiAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICA8dGQgIGNsYXNzPVwib3V0ZXItdGRcIiBzdHlsZT1cInBhZGRpbmc6MHB4IDE1cHggNDVweCAxNXB4XCI+XHJcbiAgICAgICAgICAgICAgPHRhYmxlIGJvcmRlcj1cIjBcIiBjZWxsUGFkZGluZz1cIjBcIiBjZWxsU3BhY2luZz1cIjBcIiBjbGFzcz1cImJ1dHRvbi1jc3NfX2RlZXAtdGFibGVfX18yT1p5YiB3cmFwcGVyLW1vYmlsZVwiPlxyXG4gICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCAgYmdjb2xvcj1cIiMwMTQ0MDFcIiBjbGFzcz1cImlubmVyLXRkXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOjZweDtmb250LXNpemU6MTZweDtiYWNrZ3JvdW5kLWNvbG9yOmluaGVyaXQ7d2lkdGg6NDAlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgQ2F0ZWdvcnlcclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCAgYmdjb2xvcj1cIiMwMTQ0MDFcIiBjbGFzcz1cImlubmVyLXRkXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOjZweDtmb250LXNpemU6MTZweDtiYWNrZ3JvdW5kLWNvbG9yOmluaGVyaXQ7d2lkdGg6MTBweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA6XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3twYXJhbXMuY2F0ZWdvcnl9fSBcclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIFN1YmNhdGVnb3J5XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0O3dpZHRoOjEwcHhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7cGFyYW1zLnR5cGV9fSBcclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdDtcIj5cclxuICAgICAgICAgICAgICAgICAgICBOYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0O3dpZHRoOjEwcHhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7cGFyYW1zLmZpcnN0TmFtZX19IHt7cGFyYW1zLmxhc3ROYW1lfX0gXHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgTmFtZSBLbm93biBieVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdDt3aWR0aDoxMHB4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDpcclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCAgYmdjb2xvcj1cIiMwMTQ0MDFcIiBjbGFzcz1cImlubmVyLXRkXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOjZweDtmb250LXNpemU6MTZweDtiYWNrZ3JvdW5kLWNvbG9yOmluaGVyaXRcIj5cclxuICAgICAgICAgICAgICAgICAgICB7e3BhcmFtcy5zdGFnZU5hbWV9fSBcclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIENvdW50cnlcclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCAgYmdjb2xvcj1cIiMwMTQ0MDFcIiBjbGFzcz1cImlubmVyLXRkXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOjZweDtmb250LXNpemU6MTZweDtiYWNrZ3JvdW5kLWNvbG9yOmluaGVyaXQ7d2lkdGg6MTBweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA6XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3twYXJhbXMuY291bnRyeX19IFxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgUmVxdWVzdGVkIEJ5XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0O3dpZHRoOjEwcHhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7cGFyYW1zLnJlcXVlc3RlZEJ5TmFtZX19ICh7e3BhcmFtcy5yZXF1ZXN0ZWRCeUVtYWlsfX0pXHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICA8L3RyPlxyXG4gICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgPC90YWJsZT5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7XCI+XHJcbiAgICAgICAgPGEgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiMwMTQ0MDE7Ym9yZGVyOjFweCBzb2xpZCAjMzMzMzMzO2JvcmRlci1jb2xvcjojMDE0NDAxO2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlci13aWR0aDoxcHg7Y29sb3I6I2ZmZmZmZjtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LWZhbWlseTphcmlhbCxoZWx2ZXRpY2Esc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDpub3JtYWw7bGV0dGVyLXNwYWNpbmc6MHB4O2xpbmUtaGVpZ2h0OjE2cHg7cGFkZGluZzogMTVweCAzMHB4IDE1cHggMzBweDt0ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWRlY29yYXRpb246bm9uZTsvKiB3aWR0aDogMjBweDsgKi9cIiBocmVmPVwie3twYXJhbXMuYzJhTGlua319XCIgdGFyZ2V0PVwiX2JsYW5rXCI+e3twYXJhbXMuYzJhQnV0dG9ufX08L2E+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmO2NvbG9yOiM3YTdhN2E7Zm9udC1zaXplOjExcHg7bGluZS1oZWlnaHQ6MjBweDtwYWRkaW5nOjBweCAwcHggMTVweCAwcHg7dGV4dC1hbGlnbjpjZW50ZXJcIj5cclxuICAgICAgICAgICAgICA8cCBzdHlsZT1cImZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoyNHB4O3BhZGRpbmc6MCAyMHB4O21hcmdpbjowO3RleHQtYWxpZ246Y2VudGVyXCI+Q29weXJpZ2h0IMKpIDIwMTUtMjAyMiwgUGxlYWNlIEF3YWtlbiAvIEltcHJlc3N1bS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLVtpZiBtc29dPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+PC90cj48L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvY2VudGVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhW2VuZGlmXS0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvY2VudGVyPlxyXG4gICAgICAgIDwvYm9keT5cclxuICAgICAgPC9odG1sPmA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXROb3RpZnlDbHViVGVtcGxhdGUoKSB7XHJcbiAgICAgIHJldHVybiBgPCFET0NUWVBFIGh0bWwgUFVCTElDIFwiLS8vVzNDLy9EVEQgWEhUTUwgMS4wIFN0cmljdC8vRU5cIiBcImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXN0cmljdC5kdGRcIj5cclxuICAgICAgPGh0bWwgZGF0YS1lZGl0b3ItdmVyc2lvbj1cIjJcIiBjbGFzcz1cInNnLWNhbXBhaWduc1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiPlxyXG4gICAgICAgIDxoZWFkPlxyXG4gICAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dXRmLThcIiAvPlxyXG4gICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLCBtaW5pbXVtLXNjYWxlPTEsIG1heGltdW0tc2NhbGU9MVwiIC8+PCEtLVtpZiAhbXNvXT48IS0tPlxyXG4gICAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj1cIlgtVUEtQ29tcGF0aWJsZVwiIGNvbnRlbnQ9XCJJRT1FZGdlXCIgLz48IS0tPCFbZW5kaWZdLS0+XHJcbiAgICAgICAgICA8IS0tW2lmIChndGUgbXNvIDkpfChJRSldPlxyXG4gICAgICAgICAgPHhtbD5cclxuICAgICAgICAgIDxvOk9mZmljZURvY3VtZW50U2V0dGluZ3M+XHJcbiAgICAgICAgICA8bzpBbGxvd1BORy8+XHJcbiAgICAgICAgICA8bzpQaXhlbHNQZXJJbmNoPjk2PC9vOlBpeGVsc1BlckluY2g+XHJcbiAgICAgICAgICA8L286T2ZmaWNlRG9jdW1lbnRTZXR0aW5ncz5cclxuICAgICAgICAgIDwveG1sPlxyXG4gICAgICAgICAgPCFbZW5kaWZdLS0+XHJcbiAgICAgICAgICA8IS0tW2lmIChndGUgbXNvIDkpfChJRSldPlxyXG4gICAgICAgICAgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxyXG4gICAgICAgICAgICBib2R5IHt3aWR0aDogNjAwcHg7bWFyZ2luOiAwIGF1dG87fVxyXG4gICAgICAgICAgICB0YWJsZSB7Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTt9XHJcbiAgICAgICAgICAgIHRhYmxlLCB0ZCB7bXNvLXRhYmxlLWxzcGFjZTogMHB0O21zby10YWJsZS1yc3BhY2U6IDBwdDt9XHJcbiAgICAgICAgICAgIGltZyB7LW1zLWludGVycG9sYXRpb24tbW9kZTogYmljdWJpYzt9XHJcbiAgICAgICAgICA8L3N0eWxlPlxyXG4gICAgICAgICAgPCFbZW5kaWZdLS0+XHJcbiAgICAgIFxyXG4gICAgICAgICAgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxyXG4gICAgICAgICAgICBib2R5LCBwLCBkaXYge1xyXG4gICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBhcmlhbDtcclxuICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYm9keSB7XHJcbiAgICAgICAgICAgICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYm9keSBhIHtcclxuICAgICAgICAgICAgICBjb2xvcjogIzExODhFNjtcclxuICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcCB7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgfVxyXG4gICAgICAgICAgICB0YWJsZS53cmFwcGVyIHtcclxuICAgICAgICAgICAgICB3aWR0aDoxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgdGFibGUtbGF5b3V0OiBmaXhlZDtcclxuICAgICAgICAgICAgICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcclxuICAgICAgICAgICAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XHJcbiAgICAgICAgICAgICAgLW1vei10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xyXG4gICAgICAgICAgICAgIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGltZy5tYXgtd2lkdGgge1xyXG4gICAgICAgICAgICAgIG1heC13aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5jb2x1bW4ub2YtMiB7XHJcbiAgICAgICAgICAgICAgd2lkdGg6IDUwJTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAuY29sdW1uLm9mLTMge1xyXG4gICAgICAgICAgICAgIHdpZHRoOiAzMy4zMzMlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5jb2x1bW4ub2YtNCB7XHJcbiAgICAgICAgICAgICAgd2lkdGg6IDI1JTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjQ4MHB4KSB7XHJcbiAgICAgICAgICAgICAgLnByZWhlYWRlciAucmlnaHRDb2x1bW5Db250ZW50LFxyXG4gICAgICAgICAgICAgIC5mb290ZXIgLnJpZ2h0Q29sdW1uQ29udGVudCB7XHJcbiAgICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLnByZWhlYWRlciAucmlnaHRDb2x1bW5Db250ZW50IGRpdixcclxuICAgICAgICAgICAgICAucHJlaGVhZGVyIC5yaWdodENvbHVtbkNvbnRlbnQgc3BhbixcclxuICAgICAgICAgICAgICAuZm9vdGVyIC5yaWdodENvbHVtbkNvbnRlbnQgZGl2LFxyXG4gICAgICAgICAgICAgIC5mb290ZXIgLnJpZ2h0Q29sdW1uQ29udGVudCBzcGFuIHtcclxuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLnByZWhlYWRlciAucmlnaHRDb2x1bW5Db250ZW50LFxyXG4gICAgICAgICAgICAgIC5wcmVoZWFkZXIgLmxlZnRDb2x1bW5Db250ZW50IHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogODAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiA1cHggMDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGFibGUud3JhcHBlci1tb2JpbGUge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGltZy5tYXgtd2lkdGgge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBtYXgtd2lkdGg6IDQ4MHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGEuYnVsbGV0cHJvb2YtYnV0dG9uIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogYXV0byAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA4MCU7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLmNvbHVtbnMge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLmNvbHVtbiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAudG90YWxfc3BhY2VyIHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6MHB4IDBweCAwcHggMHB4O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgPC9zdHlsZT5cclxuICAgICAgICAgIDwhLS11c2VyIGVudGVyZWQgSGVhZCBTdGFydC0tPlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgPCEtLUVuZCBIZWFkIHVzZXIgZW50ZXJlZC0tPlxyXG4gICAgICAgIDwvaGVhZD5cclxuICAgICAgICA8Ym9keT5cclxuICAgICAgICAgIDxjZW50ZXIgY2xhc3M9XCJ3cmFwcGVyXCIgZGF0YS1saW5rLWNvbG9yPVwiIzExODhFNlwiIGRhdGEtYm9keS1zdHlsZT1cImZvbnQtc2l6ZTogMTRweDsgZm9udC1mYW1pbHk6IGFyaWFsOyBjb2xvcjogIzAwMDAwMDsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlYmtpdFwiPlxyXG4gICAgICAgICAgICAgIDx0YWJsZSBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBib3JkZXI9XCIwXCIgd2lkdGg9XCIxMDAlXCIgY2xhc3M9XCJ3cmFwcGVyXCIgYmdjb2xvcj1cIiNmZmZmZmZcIj5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgPHRkIHZhbGlnbj1cInRvcFwiIGJnY29sb3I9XCIjZmZmZmZmXCIgd2lkdGg9XCIxMDAlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIHdpZHRoPVwiMTAwJVwiIHJvbGU9XCJjb250ZW50LWNvbnRhaW5lclwiIGNsYXNzPVwib3V0ZXJcIiBhbGlnbj1cImNlbnRlclwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGJvcmRlcj1cIjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHdpZHRoPVwiMTAwJVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSB3aWR0aD1cIjEwMCVcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBib3JkZXI9XCIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tW2lmIG1zb10+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNlbnRlcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGU+PHRyPjx0ZCB3aWR0aD1cIjYwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhW2VuZGlmXS0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSB3aWR0aD1cIjEwMCVcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBib3JkZXI9XCIwXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTsgbWF4LXdpZHRoOjYwMHB4O1wiIGFsaWduPVwiY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCByb2xlPVwibW9kdWxlcy1jb250YWluZXJcIiBzdHlsZT1cInBhZGRpbmc6IDBweCAwcHggMHB4IDBweDsgY29sb3I6ICMwMDAwMDA7IHRleHQtYWxpZ246IGxlZnQ7XCIgYmdjb2xvcj1cIiNmZmZmZmZcIiB3aWR0aD1cIjEwMCVcIiBhbGlnbj1cImxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgIDx0YWJsZSBjbGFzcz1cIm1vZHVsZSBwcmVoZWFkZXIgcHJlaGVhZGVyLWhpZGVcIiByb2xlPVwibW9kdWxlXCIgZGF0YS10eXBlPVwicHJlaGVhZGVyXCIgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHdpZHRoPVwiMTAwJVwiXHJcbiAgICAgICAgICAgICAgICAgc3R5bGU9XCJkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IG1zby1oaWRlOiBhbGw7IHZpc2liaWxpdHk6IGhpZGRlbjsgb3BhY2l0eTogMDsgY29sb3I6IHRyYW5zcGFyZW50OyBoZWlnaHQ6IDA7IHdpZHRoOiAwO1wiPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgPHRkIHJvbGU9XCJtb2R1bGUtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgPHA+PC9wPlxyXG4gICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ3cmFwcGVyXCIgcm9sZT1cIm1vZHVsZVwiIGRhdGEtdHlwZT1cImltYWdlXCIgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHdpZHRoPVwiMTAwJVwiIHN0eWxlPVwidGFibGUtbGF5b3V0OiBmaXhlZDtcIj5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT1cImZvbnQtc2l6ZTo2cHg7bGluZS1oZWlnaHQ6MTBweDtwYWRkaW5nOjE1cHggMHB4IDBweCAwcHg7XCIgdmFsaWduPVwidG9wXCIgYWxpZ249XCJjZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgYm9yZGVyPVwiMFwiIHN0eWxlPVwiZGlzcGxheTpibG9jaztjb2xvcjojMDAwMDAwO3RleHQtZGVjb3JhdGlvbjpub25lO2ZvbnQtZmFtaWx5OkhlbHZldGljYSwgYXJpYWwsIHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7d2lkdGg6MTIwcHg7aGVpZ2h0OmF1dG8gIWltcG9ydGFudDtcIiBzcmM9XCJodHRwczovL3BsZWFjZWdvbGYud29ybGQvYXNzZXRzL3BsZWFjZS1nb2xmLWNpcmNsZS5wbmdcIiBhbHQ9XCJcIiB3aWR0aD1cIjYwMFwiPlxyXG4gICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICBcclxuICAgICAgICAgIDx0YWJsZSBjbGFzcz1cIm1vZHVsZVwiIHJvbGU9XCJtb2R1bGVcIiBkYXRhLXR5cGU9XCJ0ZXh0XCIgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHdpZHRoPVwiMTAwJVwiIHN0eWxlPVwidGFibGUtbGF5b3V0OiBmaXhlZDtcIj5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6MzVweCA0NXB4IDEwcHggNDVweDtsaW5lLWhlaWdodDoyMnB4O3RleHQtYWxpZ246aW5oZXJpdDtcIlxyXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIxMDAlXCJcclxuICAgICAgICAgICAgICAgICAgdmFsaWduPVwidG9wXCJcclxuICAgICAgICAgICAgICAgICAgYmdjb2xvcj1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO1wiPjxzdHJvbmc+PHNwYW4gc3R5bGU9XCJjb2xvcjojM0UzRTNFO1wiPjxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjIwcHg7XCI+e3twYXJhbXMuaGVhZGVyfX08L3NwYW4+PC9zcGFuPjwvc3Ryb25nPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgIFxyXG4gICAgICAgICAgPHRhYmxlIGNsYXNzPVwibW9kdWxlXCIgcm9sZT1cIm1vZHVsZVwiIGRhdGEtdHlwZT1cInRleHRcIiBib3JkZXI9XCIwXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgd2lkdGg9XCIxMDAlXCIgc3R5bGU9XCJ0YWJsZS1sYXlvdXQ6IGZpeGVkO1wiPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzoyMHB4IDE1cHggMzBweCAxNXB4O2xpbmUtaGVpZ2h0OjIycHg7dGV4dC1hbGlnbjppbmhlcml0O1wiXHJcbiAgICAgICAgICAgICAgICAgIGhlaWdodD1cIjEwMCVcIlxyXG4gICAgICAgICAgICAgICAgICB2YWxpZ249XCJ0b3BcIlxyXG4gICAgICAgICAgICAgICAgICBiZ2NvbG9yPVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXY+PHNwYW4gc3R5bGU9XCJjb2xvcjojMzMzMzMzO1wiPnt7cGFyYW1zLnRleHR9fTwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7XCI+XHJcbiAgICAgICAgPGEgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiMwMTQ0MDE7Ym9yZGVyOjFweCBzb2xpZCAjMzMzMzMzO2JvcmRlci1jb2xvcjojMDE0NDAxO2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlci13aWR0aDoxcHg7Y29sb3I6I2ZmZmZmZjtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LWZhbWlseTphcmlhbCxoZWx2ZXRpY2Esc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDpub3JtYWw7bGV0dGVyLXNwYWNpbmc6MHB4O2xpbmUtaGVpZ2h0OjE2cHg7cGFkZGluZzogMTVweCAzMHB4IDE1cHggMzBweDt0ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWRlY29yYXRpb246bm9uZTsvKiB3aWR0aDogMjBweDsgKi9cIiBocmVmPVwie3twYXJhbXMuYzJhTGlua319XCIgdGFyZ2V0PVwiX2JsYW5rXCI+e3twYXJhbXMuYzJhQnV0dG9ufX08L2E+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbjoxMHB4IDBweFwiPlxyXG5cdCAgICAgICAgPHA+UExlYWNlIEdvbGYgV29ybGQgaXMgYSBjcm9zcy1jb250aW5lbnRhbCByZWFsLXRpbWUgc2NvcmluZyBhcHAgZm9yIGZpbmFuY2lhbCBzdXBwb3J0IG9mIHRoZSBwcm9qZWN0cyBhbmQgZXZlbnRzIG9mIFBMZWFjZSBBd2FrZW4uIFdlIGJyaW5nIHRoZSB3b3JsZCB0b2dldGhlciB0aHJvdWdoIHNwb3J0IGFuZCBkaXNjdXNzaW9uLCB0byBmaW5kIHNvbHV0aW9ucyBmb3IgaHVtYW5pdGFyaWFuIGNoYWxsZW5nZXMuIFdlIGxhdW5jaCBHb2xmIGRldmVsb3BtZW50IHByb2dyYW1zLCBidWlsdCBzYWZlIGhhdmVucyBhbmQgZWR1Y2F0aW9uYWwgZmFjaWxpdGllcyBmb3IgYWJ1c2UgdmljdGltcyBhbmQgbGF1bmNoIGNvbW11bml0eSB1cGxpZnRtZW50IHByb2plY3RzLiBXZSB1c2UgI2dvbGY0Y2hhbmdlLiBUb2dldGhlciB3ZSBjYW4gbWFrZSBhIGRpZmZlcmVuY2UhPC9wPlxyXG5cdCAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6I2ZmZmZmZjtjb2xvcjojN2E3YTdhO2ZvbnQtc2l6ZToxMXB4O2xpbmUtaGVpZ2h0OjIwcHg7cGFkZGluZzowcHggMHB4IDE1cHggMHB4O3RleHQtYWxpZ246Y2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgPHAgc3R5bGU9XCJmb250LXNpemU6MTJweDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MjRweDtwYWRkaW5nOjAgMjBweDttYXJnaW46MDt0ZXh0LWFsaWduOmNlbnRlclwiPkNvcHlyaWdodCDCqSAyMDE1LTIwMjIsIFBsZWFjZSBBd2FrZW4gLyBJbXByZXNzdW0uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1baWYgbXNvXT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPjwvdHI+PC90YWJsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2NlbnRlcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IVtlbmRpZl0tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2NlbnRlcj5cclxuICAgICAgICA8L2JvZHk+XHJcbiAgICAgIDwvaHRtbD5gO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0R29sZkNsdWJVcGRhdGVkVGVtcGxhdGUoKSB7XHJcbiAgICAgIHJldHVybiBgPCFET0NUWVBFIGh0bWwgUFVCTElDIFwiLS8vVzNDLy9EVEQgWEhUTUwgMS4wIFN0cmljdC8vRU5cIiBcImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXN0cmljdC5kdGRcIj5cclxuICAgICAgPGh0bWwgZGF0YS1lZGl0b3ItdmVyc2lvbj1cIjJcIiBjbGFzcz1cInNnLWNhbXBhaWduc1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiPlxyXG4gICAgICAgIDxoZWFkPlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8bWV0YSBodHRwLWVxdWl2PVwiQ29udGVudC1UeXBlXCIgY29udGVudD1cInRleHQvaHRtbDsgY2hhcnNldD11dGYtOFwiIC8+XHJcbiAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEsIG1pbmltdW0tc2NhbGU9MSwgbWF4aW11bS1zY2FsZT0xXCIgLz48IS0tW2lmICFtc29dPjwhLS0+XHJcbiAgICAgICAgICA8bWV0YSBodHRwLWVxdWl2PVwiWC1VQS1Db21wYXRpYmxlXCIgY29udGVudD1cIklFPUVkZ2VcIiAvPjwhLS08IVtlbmRpZl0tLT5cclxuICAgICAgICAgIDwhLS1baWYgKGd0ZSBtc28gOSl8KElFKV0+XHJcbiAgICAgICAgICA8eG1sPlxyXG4gICAgICAgICAgPG86T2ZmaWNlRG9jdW1lbnRTZXR0aW5ncz5cclxuICAgICAgICAgIDxvOkFsbG93UE5HLz5cclxuICAgICAgICAgIDxvOlBpeGVsc1BlckluY2g+OTY8L286UGl4ZWxzUGVySW5jaD5cclxuICAgICAgICAgIDwvbzpPZmZpY2VEb2N1bWVudFNldHRpbmdzPlxyXG4gICAgICAgICAgPC94bWw+XHJcbiAgICAgICAgICA8IVtlbmRpZl0tLT5cclxuICAgICAgICAgIDwhLS1baWYgKGd0ZSBtc28gOSl8KElFKV0+XHJcbiAgICAgICAgICA8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XHJcbiAgICAgICAgICAgIGJvZHkge3dpZHRoOiA2MDBweDttYXJnaW46IDAgYXV0bzt9XHJcbiAgICAgICAgICAgIHRhYmxlIHtib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO31cclxuICAgICAgICAgICAgdGFibGUsIHRkIHttc28tdGFibGUtbHNwYWNlOiAwcHQ7bXNvLXRhYmxlLXJzcGFjZTogMHB0O31cclxuICAgICAgICAgICAgaW1nIHstbXMtaW50ZXJwb2xhdGlvbi1tb2RlOiBiaWN1YmljO31cclxuICAgICAgICAgIDwvc3R5bGU+XHJcbiAgICAgICAgICA8IVtlbmRpZl0tLT5cclxuICAgICAgXHJcbiAgICAgICAgICA8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XHJcbiAgICAgICAgICAgIGJvZHksIHAsIGRpdiB7XHJcbiAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IGFyaWFsO1xyXG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBib2R5IHtcclxuICAgICAgICAgICAgICBjb2xvcjogIzAwMDAwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBib2R5IGEge1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAjMTE4OEU2O1xyXG4gICAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwIHsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyB9XHJcbiAgICAgICAgICAgIHRhYmxlLndyYXBwZXIge1xyXG4gICAgICAgICAgICAgIHdpZHRoOjEwMCUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xyXG4gICAgICAgICAgICAgIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xyXG4gICAgICAgICAgICAgIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcclxuICAgICAgICAgICAgICAtbW96LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XHJcbiAgICAgICAgICAgICAgLW1zLXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW1nLm1heC13aWR0aCB7XHJcbiAgICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLmNvbHVtbi5vZi0yIHtcclxuICAgICAgICAgICAgICB3aWR0aDogNTAlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5jb2x1bW4ub2YtMyB7XHJcbiAgICAgICAgICAgICAgd2lkdGg6IDMzLjMzMyU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLmNvbHVtbi5vZi00IHtcclxuICAgICAgICAgICAgICB3aWR0aDogMjUlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NDgwcHgpIHtcclxuICAgICAgICAgICAgICAucHJlaGVhZGVyIC5yaWdodENvbHVtbkNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgLmZvb3RlciAucmlnaHRDb2x1bW5Db250ZW50IHtcclxuICAgICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAucHJlaGVhZGVyIC5yaWdodENvbHVtbkNvbnRlbnQgZGl2LFxyXG4gICAgICAgICAgICAgIC5wcmVoZWFkZXIgLnJpZ2h0Q29sdW1uQ29udGVudCBzcGFuLFxyXG4gICAgICAgICAgICAgIC5mb290ZXIgLnJpZ2h0Q29sdW1uQ29udGVudCBkaXYsXHJcbiAgICAgICAgICAgICAgLmZvb3RlciAucmlnaHRDb2x1bW5Db250ZW50IHNwYW4ge1xyXG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAucHJlaGVhZGVyIC5yaWdodENvbHVtbkNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgLnByZWhlYWRlciAubGVmdENvbHVtbkNvbnRlbnQge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA4MCUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDVweCAwO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB0YWJsZS53cmFwcGVyLW1vYmlsZSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgdGFibGUtbGF5b3V0OiBmaXhlZDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaW1nLm1heC13aWR0aCB7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIG1heC13aWR0aDogNDgwcHggIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYS5idWxsZXRwcm9vZi1idXR0b24ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDgwJTtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAuY29sdW1ucyB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAuY29sdW1uIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAwICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC50b3RhbF9zcGFjZXIge1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZzowcHggMHB4IDBweCAwcHg7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICA8L3N0eWxlPlxyXG4gICAgICAgICAgPCEtLXVzZXIgZW50ZXJlZCBIZWFkIFN0YXJ0LS0+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICA8IS0tRW5kIEhlYWQgdXNlciBlbnRlcmVkLS0+XHJcbiAgICAgICAgPC9oZWFkPlxyXG4gICAgICAgIDxib2R5PlxyXG4gICAgICAgICAgPGNlbnRlciBjbGFzcz1cIndyYXBwZXJcIiBkYXRhLWxpbmstY29sb3I9XCIjMTE4OEU2XCIgZGF0YS1ib2R5LXN0eWxlPVwiZm9udC1zaXplOiAxNHB4OyBmb250LWZhbWlseTogYXJpYWw7IGNvbG9yOiAjMDAwMDAwOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2Via2l0XCI+XHJcbiAgICAgICAgICAgICAgPHRhYmxlIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGJvcmRlcj1cIjBcIiB3aWR0aD1cIjEwMCVcIiBjbGFzcz1cIndyYXBwZXJcIiBiZ2NvbG9yPVwiI2ZmZmZmZlwiPlxyXG4gICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgdmFsaWduPVwidG9wXCIgYmdjb2xvcj1cIiNmZmZmZmZcIiB3aWR0aD1cIjEwMCVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgd2lkdGg9XCIxMDAlXCIgcm9sZT1cImNvbnRlbnQtY29udGFpbmVyXCIgY2xhc3M9XCJvdXRlclwiIGFsaWduPVwiY2VudGVyXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgYm9yZGVyPVwiMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgd2lkdGg9XCIxMDAlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIHdpZHRoPVwiMTAwJVwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGJvcmRlcj1cIjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1baWYgbXNvXT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y2VudGVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZT48dHI+PHRkIHdpZHRoPVwiNjAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCFbZW5kaWZdLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIHdpZHRoPVwiMTAwJVwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGJvcmRlcj1cIjBcIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBtYXgtd2lkdGg6NjAwcHg7XCIgYWxpZ249XCJjZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHJvbGU9XCJtb2R1bGVzLWNvbnRhaW5lclwiIHN0eWxlPVwicGFkZGluZzogMHB4IDBweCAwcHggMHB4OyBjb2xvcjogIzAwMDAwMDsgdGV4dC1hbGlnbjogbGVmdDtcIiBiZ2NvbG9yPVwiI2ZmZmZmZlwiIHdpZHRoPVwiMTAwJVwiIGFsaWduPVwibGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgPHRhYmxlIGNsYXNzPVwibW9kdWxlXCIgcm9sZT1cIm1vZHVsZVwiIGRhdGEtdHlwZT1cInRleHRcIiBib3JkZXI9XCIwXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgd2lkdGg9XCIxMDAlXCIgc3R5bGU9XCJ0YWJsZS1sYXlvdXQ6IGZpeGVkO1wiPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzozNXB4IDQ1cHggMTBweCA0NXB4O2xpbmUtaGVpZ2h0OjIycHg7dGV4dC1hbGlnbjppbmhlcml0O1wiXHJcbiAgICAgICAgICAgICAgICAgIGhlaWdodD1cIjEwMCVcIlxyXG4gICAgICAgICAgICAgICAgICB2YWxpZ249XCJ0b3BcIlxyXG4gICAgICAgICAgICAgICAgICBiZ2NvbG9yPVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCI+PHN0cm9uZz48c3BhbiBzdHlsZT1cImNvbG9yOiMzRTNFM0U7XCI+PHNwYW4gc3R5bGU9XCJmb250LXNpemU6MjBweDtcIj57e3BhcmFtcy5oZWFkZXJ9fTwvc3Bhbj48L3NwYW4+PC9zdHJvbmc+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgXHJcbiAgICAgICAgICA8dGFibGUgY2xhc3M9XCJtb2R1bGVcIiByb2xlPVwibW9kdWxlXCIgZGF0YS10eXBlPVwidGV4dFwiIGJvcmRlcj1cIjBcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiB3aWR0aD1cIjEwMCVcIiBzdHlsZT1cInRhYmxlLWxheW91dDogZml4ZWQ7XCI+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjIwcHggMTVweCAzMHB4IDE1cHg7bGluZS1oZWlnaHQ6MjJweDt0ZXh0LWFsaWduOmluaGVyaXQ7XCJcclxuICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTAwJVwiXHJcbiAgICAgICAgICAgICAgICAgIHZhbGlnbj1cInRvcFwiXHJcbiAgICAgICAgICAgICAgICAgIGJnY29sb3I9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdj48c3BhbiBzdHlsZT1cImNvbG9yOiMzMzMzMzM7XCI+RGVhciBVc2VyICwge3twYXJhbXMudGV4dH19PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgIDx0YWJsZSBib3JkZXI9XCIwXCIgY2VsbFBhZGRpbmc9XCIwXCIgY2VsbFNwYWNpbmc9XCIwXCIgY2xhc3M9XCJtb2R1bGVcIiBkYXRhLXJvbGU9XCJtb2R1bGUtYnV0dG9uXCIgZGF0YS10eXBlPVwiYnV0dG9uXCIgcm9sZT1cIm1vZHVsZVwiIHN0eWxlPVwidGFibGUtbGF5b3V0OmZpeGVkXCIgd2lkdGg9XCIxMDAlXCI+XHJcbiAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICA8dGQgIGNsYXNzPVwib3V0ZXItdGRcIiBzdHlsZT1cInBhZGRpbmc6MHB4IDE1cHggNDVweCAxNXB4XCI+XHJcbiAgICAgICAgICAgICAgPHRhYmxlIGJvcmRlcj1cIjBcIiBjZWxsUGFkZGluZz1cIjBcIiBjZWxsU3BhY2luZz1cIjBcIiBjbGFzcz1cImJ1dHRvbi1jc3NfX2RlZXAtdGFibGVfX18yT1p5YiB3cmFwcGVyLW1vYmlsZVwiPlxyXG4gICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdDt3aWR0aDozNSVcIj5cclxuICAgICAgICAgICAgICAgICAgICBDbHViIE5hbWVcclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCAgYmdjb2xvcj1cIiMwMTQ0MDFcIiBjbGFzcz1cImlubmVyLXRkXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOjZweDtmb250LXNpemU6MTZweDtiYWNrZ3JvdW5kLWNvbG9yOmluaGVyaXQ7d2lkdGg6MjBweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAtXHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3twYXJhbXMuY2x1Yk5hbWV9fSBcclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIENvdW50cnlcclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCAgYmdjb2xvcj1cIiMwMTQ0MDFcIiBjbGFzcz1cImlubmVyLXRkXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOjZweDtmb250LXNpemU6MTZweDtiYWNrZ3JvdW5kLWNvbG9yOmluaGVyaXQ7d2lkdGg6MjBweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAtXHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3twYXJhbXMuY291bnRyeX19IFxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgPC90cj5cclxuICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO1wiPlxyXG4gICAgICAgIDxhIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjojMDE0NDAxO2JvcmRlcjoxcHggc29saWQgIzMzMzMzMztib3JkZXItY29sb3I6IzAxNDQwMTtib3JkZXItcmFkaXVzOjRweDtib3JkZXItd2lkdGg6MXB4O2NvbG9yOiNmZmZmZmY7ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC1mYW1pbHk6YXJpYWwsaGVsdmV0aWNhLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6bm9ybWFsO2xldHRlci1zcGFjaW5nOjBweDtsaW5lLWhlaWdodDoxNnB4O3BhZGRpbmc6IDE1cHggMzBweCAxNXB4IDMwcHg7dGV4dC1hbGlnbjpjZW50ZXI7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Lyogd2lkdGg6IDIwcHg7ICovXCIgaHJlZj1cInt7cGFyYW1zLmMyYUxpbmt9fVwiIHRhcmdldD1cIl9ibGFua1wiPnt7cGFyYW1zLmMyYUJ1dHRvbn19PC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW46MTBweCAwcHhcIj5cclxuXHQgICAgICAgIDxwPlBMZWFjZSBHb2xmIFdvcmxkIGlzIGEgY3Jvc3MtY29udGluZW50YWwgcmVhbC10aW1lIHNjb3JpbmcgYXBwIGZvciBmaW5hbmNpYWwgc3VwcG9ydCBvZiB0aGUgcHJvamVjdHMgYW5kIGV2ZW50cyBvZiBQTGVhY2UgQXdha2VuLiBXZSBicmluZyB0aGUgd29ybGQgdG9nZXRoZXIgdGhyb3VnaCBzcG9ydCBhbmQgZGlzY3Vzc2lvbiwgdG8gZmluZCBzb2x1dGlvbnMgZm9yIGh1bWFuaXRhcmlhbiBjaGFsbGVuZ2VzLiBXZSBsYXVuY2ggR29sZiBkZXZlbG9wbWVudCBwcm9ncmFtcywgYnVpbHQgc2FmZSBoYXZlbnMgYW5kIGVkdWNhdGlvbmFsIGZhY2lsaXRpZXMgZm9yIGFidXNlIHZpY3RpbXMgYW5kIGxhdW5jaCBjb21tdW5pdHkgdXBsaWZ0bWVudCBwcm9qZWN0cy4gV2UgdXNlICNnb2xmNGNoYW5nZS4gVG9nZXRoZXIgd2UgY2FuIG1ha2UgYSBkaWZmZXJlbmNlITwvcD5cclxuXHQgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmY7Y29sb3I6IzdhN2E3YTtmb250LXNpemU6MTFweDtsaW5lLWhlaWdodDoyMHB4O3BhZGRpbmc6MHB4IDBweCAxNXB4IDBweDt0ZXh0LWFsaWduOmNlbnRlclwiPlxyXG4gICAgICAgICAgICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjI0cHg7cGFkZGluZzowIDIwcHg7bWFyZ2luOjA7dGV4dC1hbGlnbjpjZW50ZXJcIj5Db3B5cmlnaHQgwqkgMjAxNS0yMDIyLCBQbGVhY2UgQXdha2VuIC8gSW1wcmVzc3VtLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tW2lmIG1zb10+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD48L3RyPjwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9jZW50ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCFbZW5kaWZdLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9jZW50ZXI+XHJcbiAgICAgICAgPC9ib2R5PlxyXG4gICAgICA8L2h0bWw+YDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TmVlZEhlbHBUZW1wbGF0ZSgpIHtcclxuICAgICAgcmV0dXJuIGA8IURPQ1RZUEUgaHRtbCBQVUJMSUMgXCItLy9XM0MvL0RURCBYSFRNTCAxLjAgU3RyaWN0Ly9FTlwiIFwiaHR0cDovL3d3dy53My5vcmcvVFIveGh0bWwxL0RURC94aHRtbDEtc3RyaWN0LmR0ZFwiPlxyXG4gICAgICA8aHRtbCBkYXRhLWVkaXRvci12ZXJzaW9uPVwiMlwiIGNsYXNzPVwic2ctY2FtcGFpZ25zXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI+XHJcbiAgICAgICAgPGhlYWQ+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJDb250ZW50LVR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04XCIgLz5cclxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSwgbWluaW11bS1zY2FsZT0xLCBtYXhpbXVtLXNjYWxlPTFcIiAvPjwhLS1baWYgIW1zb10+PCEtLT5cclxuICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiSUU9RWRnZVwiIC8+PCEtLTwhW2VuZGlmXS0tPlxyXG4gICAgICAgICAgPCEtLVtpZiAoZ3RlIG1zbyA5KXwoSUUpXT5cclxuICAgICAgICAgIDx4bWw+XHJcbiAgICAgICAgICA8bzpPZmZpY2VEb2N1bWVudFNldHRpbmdzPlxyXG4gICAgICAgICAgPG86QWxsb3dQTkcvPlxyXG4gICAgICAgICAgPG86UGl4ZWxzUGVySW5jaD45NjwvbzpQaXhlbHNQZXJJbmNoPlxyXG4gICAgICAgICAgPC9vOk9mZmljZURvY3VtZW50U2V0dGluZ3M+XHJcbiAgICAgICAgICA8L3htbD5cclxuICAgICAgICAgIDwhW2VuZGlmXS0tPlxyXG4gICAgICAgICAgPCEtLVtpZiAoZ3RlIG1zbyA5KXwoSUUpXT5cclxuICAgICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cclxuICAgICAgICAgICAgYm9keSB7d2lkdGg6IDYwMHB4O21hcmdpbjogMCBhdXRvO31cclxuICAgICAgICAgICAgdGFibGUge2JvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7fVxyXG4gICAgICAgICAgICB0YWJsZSwgdGQge21zby10YWJsZS1sc3BhY2U6IDBwdDttc28tdGFibGUtcnNwYWNlOiAwcHQ7fVxyXG4gICAgICAgICAgICBpbWcgey1tcy1pbnRlcnBvbGF0aW9uLW1vZGU6IGJpY3ViaWM7fVxyXG4gICAgICAgICAgPC9zdHlsZT5cclxuICAgICAgICAgIDwhW2VuZGlmXS0tPlxyXG4gICAgICBcclxuICAgICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cclxuICAgICAgICAgICAgYm9keSwgcCwgZGl2IHtcclxuICAgICAgICAgICAgICBmb250LWZhbWlseTogYXJpYWw7XHJcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJvZHkge1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAjMDAwMDAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJvZHkgYSB7XHJcbiAgICAgICAgICAgICAgY29sb3I6ICMxMTg4RTY7XHJcbiAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHAgeyBtYXJnaW46IDA7IHBhZGRpbmc6IDA7IH1cclxuICAgICAgICAgICAgdGFibGUud3JhcHBlciB7XHJcbiAgICAgICAgICAgICAgd2lkdGg6MTAwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XHJcbiAgICAgICAgICAgICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XHJcbiAgICAgICAgICAgICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xyXG4gICAgICAgICAgICAgIC1tb3otdGV4dC1zaXplLWFkanVzdDogMTAwJTtcclxuICAgICAgICAgICAgICAtbXMtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbWcubWF4LXdpZHRoIHtcclxuICAgICAgICAgICAgICBtYXgtd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAuY29sdW1uLm9mLTIge1xyXG4gICAgICAgICAgICAgIHdpZHRoOiA1MCU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLmNvbHVtbi5vZi0zIHtcclxuICAgICAgICAgICAgICB3aWR0aDogMzMuMzMzJTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAuY29sdW1uLm9mLTQge1xyXG4gICAgICAgICAgICAgIHdpZHRoOiAyNSU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo0ODBweCkge1xyXG4gICAgICAgICAgICAgIC5wcmVoZWFkZXIgLnJpZ2h0Q29sdW1uQ29udGVudCxcclxuICAgICAgICAgICAgICAuZm9vdGVyIC5yaWdodENvbHVtbkNvbnRlbnQge1xyXG4gICAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC5wcmVoZWFkZXIgLnJpZ2h0Q29sdW1uQ29udGVudCBkaXYsXHJcbiAgICAgICAgICAgICAgLnByZWhlYWRlciAucmlnaHRDb2x1bW5Db250ZW50IHNwYW4sXHJcbiAgICAgICAgICAgICAgLmZvb3RlciAucmlnaHRDb2x1bW5Db250ZW50IGRpdixcclxuICAgICAgICAgICAgICAuZm9vdGVyIC5yaWdodENvbHVtbkNvbnRlbnQgc3BhbiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC5wcmVoZWFkZXIgLnJpZ2h0Q29sdW1uQ29udGVudCxcclxuICAgICAgICAgICAgICAucHJlaGVhZGVyIC5sZWZ0Q29sdW1uQ29udGVudCB7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDgwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogNXB4IDA7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRhYmxlLndyYXBwZXItbW9iaWxlIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpbWcubWF4LXdpZHRoIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogYXV0byAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgbWF4LXdpZHRoOiA0ODBweCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBhLmJ1bGxldHByb29mLWJ1dHRvbiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGF1dG8gIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogODAlO1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAwICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC5jb2x1bW5zIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC5jb2x1bW4ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLnRvdGFsX3NwYWNlciB7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjBweCAwcHggMHB4IDBweDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIDwvc3R5bGU+XHJcbiAgICAgICAgICA8IS0tdXNlciBlbnRlcmVkIEhlYWQgU3RhcnQtLT5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgIDwhLS1FbmQgSGVhZCB1c2VyIGVudGVyZWQtLT5cclxuICAgICAgICA8L2hlYWQ+XHJcbiAgICAgICAgPGJvZHk+XHJcbiAgICAgICAgICA8Y2VudGVyIGNsYXNzPVwid3JhcHBlclwiIGRhdGEtbGluay1jb2xvcj1cIiMxMTg4RTZcIiBkYXRhLWJvZHktc3R5bGU9XCJmb250LXNpemU6IDE0cHg7IGZvbnQtZmFtaWx5OiBhcmlhbDsgY29sb3I6ICMwMDAwMDA7IGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWJraXRcIj5cclxuICAgICAgICAgICAgICA8dGFibGUgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgYm9yZGVyPVwiMFwiIHdpZHRoPVwiMTAwJVwiIGNsYXNzPVwid3JhcHBlclwiIGJnY29sb3I9XCIjZmZmZmZmXCI+XHJcbiAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCB2YWxpZ249XCJ0b3BcIiBiZ2NvbG9yPVwiI2ZmZmZmZlwiIHdpZHRoPVwiMTAwJVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSB3aWR0aD1cIjEwMCVcIiByb2xlPVwiY29udGVudC1jb250YWluZXJcIiBjbGFzcz1cIm91dGVyXCIgYWxpZ249XCJjZW50ZXJcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBib3JkZXI9XCIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCB3aWR0aD1cIjEwMCVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgd2lkdGg9XCIxMDAlXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgYm9yZGVyPVwiMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLVtpZiBtc29dPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjZW50ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlPjx0cj48dGQgd2lkdGg9XCI2MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IVtlbmRpZl0tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgd2lkdGg9XCIxMDAlXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgYm9yZGVyPVwiMFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IG1heC13aWR0aDo2MDBweDtcIiBhbGlnbj1cImNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgcm9sZT1cIm1vZHVsZXMtY29udGFpbmVyXCIgc3R5bGU9XCJwYWRkaW5nOiAwcHggMHB4IDBweCAwcHg7IGNvbG9yOiAjMDAwMDAwOyB0ZXh0LWFsaWduOiBsZWZ0O1wiIGJnY29sb3I9XCIjZmZmZmZmXCIgd2lkdGg9XCIxMDAlXCIgYWxpZ249XCJsZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICA8dGFibGUgY2xhc3M9XCJtb2R1bGVcIiByb2xlPVwibW9kdWxlXCIgZGF0YS10eXBlPVwidGV4dFwiIGJvcmRlcj1cIjBcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiB3aWR0aD1cIjEwMCVcIiBzdHlsZT1cInRhYmxlLWxheW91dDogZml4ZWQ7XCI+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjM1cHggNDVweCAxMHB4IDQ1cHg7bGluZS1oZWlnaHQ6MjJweDt0ZXh0LWFsaWduOmluaGVyaXQ7XCJcclxuICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTAwJVwiXHJcbiAgICAgICAgICAgICAgICAgIHZhbGlnbj1cInRvcFwiXHJcbiAgICAgICAgICAgICAgICAgIGJnY29sb3I9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjtcIj48c3Ryb25nPjxzcGFuIHN0eWxlPVwiY29sb3I6IzNFM0UzRTtcIj48c3BhbiBzdHlsZT1cImZvbnQtc2l6ZToyMHB4O1wiPnt7cGFyYW1zLmhlYWRlcn19PC9zcGFuPjwvc3Bhbj48L3N0cm9uZz48L2Rpdj5cclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICBcclxuICAgICAgICAgIDx0YWJsZSBjbGFzcz1cIm1vZHVsZVwiIHJvbGU9XCJtb2R1bGVcIiBkYXRhLXR5cGU9XCJ0ZXh0XCIgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHdpZHRoPVwiMTAwJVwiIHN0eWxlPVwidGFibGUtbGF5b3V0OiBmaXhlZDtcIj5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6MjBweCAxNXB4IDMwcHggMTVweDtsaW5lLWhlaWdodDoyMnB4O3RleHQtYWxpZ246aW5oZXJpdDtcIlxyXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIxMDAlXCJcclxuICAgICAgICAgICAgICAgICAgdmFsaWduPVwidG9wXCJcclxuICAgICAgICAgICAgICAgICAgYmdjb2xvcj1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2PjxzcGFuIHN0eWxlPVwiY29sb3I6IzMzMzMzMztcIj5EZWFyIEFkbWluICwge3twYXJhbXMudGV4dH19PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgIDx0YWJsZSBib3JkZXI9XCIwXCIgY2VsbFBhZGRpbmc9XCIwXCIgY2VsbFNwYWNpbmc9XCIwXCIgY2xhc3M9XCJtb2R1bGVcIiBkYXRhLXJvbGU9XCJtb2R1bGUtYnV0dG9uXCIgZGF0YS10eXBlPVwiYnV0dG9uXCIgcm9sZT1cIm1vZHVsZVwiIHN0eWxlPVwidGFibGUtbGF5b3V0OmZpeGVkXCIgd2lkdGg9XCIxMDAlXCI+XHJcbiAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICA8dGQgIGNsYXNzPVwib3V0ZXItdGRcIiBzdHlsZT1cInBhZGRpbmc6MHB4IDE1cHggNDVweCAxNXB4XCI+XHJcbiAgICAgICAgICAgICAgPHRhYmxlIGJvcmRlcj1cIjBcIiBjZWxsUGFkZGluZz1cIjBcIiBjZWxsU3BhY2luZz1cIjBcIiBjbGFzcz1cImJ1dHRvbi1jc3NfX2RlZXAtdGFibGVfX18yT1p5YiB3cmFwcGVyLW1vYmlsZVwiPlxyXG4gICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdDt3aWR0aDozNSVcIj5cclxuICAgICAgICAgICAgICAgICAgICBDbHViIE5hbWVcclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCAgYmdjb2xvcj1cIiMwMTQ0MDFcIiBjbGFzcz1cImlubmVyLXRkXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOjZweDtmb250LXNpemU6MTZweDtiYWNrZ3JvdW5kLWNvbG9yOmluaGVyaXQ7d2lkdGg6MjBweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAtXHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3twYXJhbXMuY2x1Yk5hbWV9fSBcclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIENvdW50cnlcclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCAgYmdjb2xvcj1cIiMwMTQ0MDFcIiBjbGFzcz1cImlubmVyLXRkXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOjZweDtmb250LXNpemU6MTZweDtiYWNrZ3JvdW5kLWNvbG9yOmluaGVyaXQ7d2lkdGg6MjBweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAtXHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3twYXJhbXMuY291bnRyeX19IFxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgUmVnYXJkaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0O3dpZHRoOjIwcHhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgLVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7cGFyYW1zLnJlZ2FyZGluZ319IFxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgSXNzdWUgRGV0YWlsc1xyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdDt3aWR0aDoyMHB4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIC1cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCAgYmdjb2xvcj1cIiMwMTQ0MDFcIiBjbGFzcz1cImlubmVyLXRkXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOjZweDtmb250LXNpemU6MTZweDtiYWNrZ3JvdW5kLWNvbG9yOmluaGVyaXRcIj5cclxuICAgICAgICAgICAgICAgICAgICB7e3BhcmFtcy5kZXRhaWxzfX0gXHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgIGJnY29sb3I9XCIjMDE0NDAxXCIgY2xhc3M9XCJpbm5lci10ZFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjE2cHg7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgUmVxdWVzdCBieVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkICBiZ2NvbG9yPVwiIzAxNDQwMVwiIGNsYXNzPVwiaW5uZXItdGRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6NnB4O2ZvbnQtc2l6ZToxNnB4O2JhY2tncm91bmQtY29sb3I6aW5oZXJpdDt3aWR0aDoyMHB4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIC1cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCAgYmdjb2xvcj1cIiMwMTQ0MDFcIiBjbGFzcz1cImlubmVyLXRkXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOjZweDtmb250LXNpemU6MTZweDtiYWNrZ3JvdW5kLWNvbG9yOmluaGVyaXRcIj5cclxuICAgICAgICAgICAgICAgICAgICB7e3BhcmFtcy5yZXF1ZXN0ZWRCeU5hbWV9fSAoIHt7cGFyYW1zLnJlcXVlc3RlZEJ5RW1haWx9fSApIFxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICA8L3RyPlxyXG4gICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgPC90YWJsZT5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7XCI+XHJcbiAgICAgICAgPGEgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiMwMTQ0MDE7Ym9yZGVyOjFweCBzb2xpZCAjMzMzMzMzO2JvcmRlci1jb2xvcjojMDE0NDAxO2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlci13aWR0aDoxcHg7Y29sb3I6I2ZmZmZmZjtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LWZhbWlseTphcmlhbCxoZWx2ZXRpY2Esc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDpub3JtYWw7bGV0dGVyLXNwYWNpbmc6MHB4O2xpbmUtaGVpZ2h0OjE2cHg7cGFkZGluZzogMTVweCAzMHB4IDE1cHggMzBweDt0ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWRlY29yYXRpb246bm9uZTsvKiB3aWR0aDogMjBweDsgKi9cIiBocmVmPVwie3twYXJhbXMuYzJhTGlua319XCIgdGFyZ2V0PVwiX2JsYW5rXCI+e3twYXJhbXMuYzJhQnV0dG9ufX08L2E+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmO2NvbG9yOiM3YTdhN2E7Zm9udC1zaXplOjExcHg7bGluZS1oZWlnaHQ6MjBweDtwYWRkaW5nOjBweCAwcHggMTVweCAwcHg7dGV4dC1hbGlnbjpjZW50ZXJcIj5cclxuICAgICAgICAgICAgICA8cCBzdHlsZT1cImZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoyNHB4O3BhZGRpbmc6MCAyMHB4O21hcmdpbjowO3RleHQtYWxpZ246Y2VudGVyXCI+Q29weXJpZ2h0IMKpIDIwMTUtMjAyMiwgUGxlYWNlIEF3YWtlbiAvIEltcHJlc3N1bS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLVtpZiBtc29dPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+PC90cj48L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvY2VudGVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhW2VuZGlmXS0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvY2VudGVyPlxyXG4gICAgICAgIDwvYm9keT5cclxuICAgICAgPC9odG1sPmA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRIZWxwU3VwcG9ydFRlbXBsYXRlKCkge1xyXG4gICAgICByZXR1cm4gYDwhRE9DVFlQRSBodG1sIFBVQkxJQyBcIi0vL1czQy8vRFREIFhIVE1MIDEuMCBTdHJpY3QvL0VOXCIgXCJodHRwOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvRFREL3hodG1sMS1zdHJpY3QuZHRkXCI+XHJcbiAgICAgIDxodG1sIGRhdGEtZWRpdG9yLXZlcnNpb249XCIyXCIgY2xhc3M9XCJzZy1jYW1wYWlnbnNcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIj5cclxuICAgICAgICA8aGVhZD5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dXRmLThcIiAvPlxyXG4gICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLCBtaW5pbXVtLXNjYWxlPTEsIG1heGltdW0tc2NhbGU9MVwiIC8+PCEtLVtpZiAhbXNvXT48IS0tPlxyXG4gICAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj1cIlgtVUEtQ29tcGF0aWJsZVwiIGNvbnRlbnQ9XCJJRT1FZGdlXCIgLz48IS0tPCFbZW5kaWZdLS0+XHJcbiAgICAgICAgICA8IS0tW2lmIChndGUgbXNvIDkpfChJRSldPlxyXG4gICAgICAgICAgPHhtbD5cclxuICAgICAgICAgIDxvOk9mZmljZURvY3VtZW50U2V0dGluZ3M+XHJcbiAgICAgICAgICA8bzpBbGxvd1BORy8+XHJcbiAgICAgICAgICA8bzpQaXhlbHNQZXJJbmNoPjk2PC9vOlBpeGVsc1BlckluY2g+XHJcbiAgICAgICAgICA8L286T2ZmaWNlRG9jdW1lbnRTZXR0aW5ncz5cclxuICAgICAgICAgIDwveG1sPlxyXG4gICAgICAgICAgPCFbZW5kaWZdLS0+XHJcbiAgICAgICAgICA8IS0tW2lmIChndGUgbXNvIDkpfChJRSldPlxyXG4gICAgICAgICAgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxyXG4gICAgICAgICAgICBib2R5IHt3aWR0aDogNjAwcHg7bWFyZ2luOiAwIGF1dG87fVxyXG4gICAgICAgICAgICB0YWJsZSB7Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTt9XHJcbiAgICAgICAgICAgIHRhYmxlLCB0ZCB7bXNvLXRhYmxlLWxzcGFjZTogMHB0O21zby10YWJsZS1yc3BhY2U6IDBwdDt9XHJcbiAgICAgICAgICAgIGltZyB7LW1zLWludGVycG9sYXRpb24tbW9kZTogYmljdWJpYzt9XHJcbiAgICAgICAgICA8L3N0eWxlPlxyXG4gICAgICAgICAgPCFbZW5kaWZdLS0+XHJcbiAgICAgIFxyXG4gICAgICAgICAgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxyXG4gICAgICAgICAgICBib2R5LCBwLCBkaXYge1xyXG4gICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBhcmlhbDtcclxuICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYm9keSB7XHJcbiAgICAgICAgICAgICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYm9keSBhIHtcclxuICAgICAgICAgICAgICBjb2xvcjogIzExODhFNjtcclxuICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcCB7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgfVxyXG4gICAgICAgICAgICB0YWJsZS53cmFwcGVyIHtcclxuICAgICAgICAgICAgICB3aWR0aDoxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgdGFibGUtbGF5b3V0OiBmaXhlZDtcclxuICAgICAgICAgICAgICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcclxuICAgICAgICAgICAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XHJcbiAgICAgICAgICAgICAgLW1vei10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xyXG4gICAgICAgICAgICAgIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGltZy5tYXgtd2lkdGgge1xyXG4gICAgICAgICAgICAgIG1heC13aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5jb2x1bW4ub2YtMiB7XHJcbiAgICAgICAgICAgICAgd2lkdGg6IDUwJTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAuY29sdW1uLm9mLTMge1xyXG4gICAgICAgICAgICAgIHdpZHRoOiAzMy4zMzMlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5jb2x1bW4ub2YtNCB7XHJcbiAgICAgICAgICAgICAgd2lkdGg6IDI1JTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjQ4MHB4KSB7XHJcbiAgICAgICAgICAgICAgLnByZWhlYWRlciAucmlnaHRDb2x1bW5Db250ZW50LFxyXG4gICAgICAgICAgICAgIC5mb290ZXIgLnJpZ2h0Q29sdW1uQ29udGVudCB7XHJcbiAgICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLnByZWhlYWRlciAucmlnaHRDb2x1bW5Db250ZW50IGRpdixcclxuICAgICAgICAgICAgICAucHJlaGVhZGVyIC5yaWdodENvbHVtbkNvbnRlbnQgc3BhbixcclxuICAgICAgICAgICAgICAuZm9vdGVyIC5yaWdodENvbHVtbkNvbnRlbnQgZGl2LFxyXG4gICAgICAgICAgICAgIC5mb290ZXIgLnJpZ2h0Q29sdW1uQ29udGVudCBzcGFuIHtcclxuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLnByZWhlYWRlciAucmlnaHRDb2x1bW5Db250ZW50LFxyXG4gICAgICAgICAgICAgIC5wcmVoZWFkZXIgLmxlZnRDb2x1bW5Db250ZW50IHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogODAlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiA1cHggMDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGFibGUud3JhcHBlci1tb2JpbGUge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGltZy5tYXgtd2lkdGgge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBtYXgtd2lkdGg6IDQ4MHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGEuYnVsbGV0cHJvb2YtYnV0dG9uIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogYXV0byAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA4MCU7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLmNvbHVtbnMge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLmNvbHVtbiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAudG90YWxfc3BhY2VyIHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6MHB4IDBweCAwcHggMHB4O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgPC9zdHlsZT5cclxuICAgICAgICAgIDwhLS11c2VyIGVudGVyZWQgSGVhZCBTdGFydC0tPlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgPCEtLUVuZCBIZWFkIHVzZXIgZW50ZXJlZC0tPlxyXG4gICAgICAgIDwvaGVhZD5cclxuICAgICAgICA8Ym9keT5cclxuICAgICAgICAgIDxjZW50ZXIgY2xhc3M9XCJ3cmFwcGVyXCIgZGF0YS1saW5rLWNvbG9yPVwiIzExODhFNlwiIGRhdGEtYm9keS1zdHlsZT1cImZvbnQtc2l6ZTogMTRweDsgZm9udC1mYW1pbHk6IGFyaWFsOyBjb2xvcjogIzAwMDAwMDsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlYmtpdFwiPlxyXG4gICAgICAgICAgICAgIDx0YWJsZSBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBib3JkZXI9XCIwXCIgd2lkdGg9XCIxMDAlXCIgY2xhc3M9XCJ3cmFwcGVyXCIgYmdjb2xvcj1cIiNmZmZmZmZcIj5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgPHRkIHZhbGlnbj1cInRvcFwiIGJnY29sb3I9XCIjZmZmZmZmXCIgd2lkdGg9XCIxMDAlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIHdpZHRoPVwiMTAwJVwiIHJvbGU9XCJjb250ZW50LWNvbnRhaW5lclwiIGNsYXNzPVwib3V0ZXJcIiBhbGlnbj1cImNlbnRlclwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGJvcmRlcj1cIjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHdpZHRoPVwiMTAwJVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSB3aWR0aD1cIjEwMCVcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBib3JkZXI9XCIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tW2lmIG1zb10+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNlbnRlcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGU+PHRyPjx0ZCB3aWR0aD1cIjYwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhW2VuZGlmXS0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSB3aWR0aD1cIjEwMCVcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBib3JkZXI9XCIwXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTsgbWF4LXdpZHRoOjYwMHB4O1wiIGFsaWduPVwiY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCByb2xlPVwibW9kdWxlcy1jb250YWluZXJcIiBzdHlsZT1cInBhZGRpbmc6IDBweCAwcHggMHB4IDBweDsgY29sb3I6ICMwMDAwMDA7IHRleHQtYWxpZ246IGxlZnQ7XCIgYmdjb2xvcj1cIiNmZmZmZmZcIiB3aWR0aD1cIjEwMCVcIiBhbGlnbj1cImxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgIDx0YWJsZSBjbGFzcz1cIm1vZHVsZVwiIHJvbGU9XCJtb2R1bGVcIiBkYXRhLXR5cGU9XCJ0ZXh0XCIgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHdpZHRoPVwiMTAwJVwiIHN0eWxlPVwidGFibGUtbGF5b3V0OiBmaXhlZDtcIj5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6MzVweCA0NXB4IDEwcHggNDVweDtsaW5lLWhlaWdodDoyMnB4O3RleHQtYWxpZ246aW5oZXJpdDtcIlxyXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIxMDAlXCJcclxuICAgICAgICAgICAgICAgICAgdmFsaWduPVwidG9wXCJcclxuICAgICAgICAgICAgICAgICAgYmdjb2xvcj1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO1wiPjxzdHJvbmc+PHNwYW4gc3R5bGU9XCJjb2xvcjojM0UzRTNFO1wiPjxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjIwcHg7XCI+e3twYXJhbXMuaGVhZGVyfX08L3NwYW4+PC9zcGFuPjwvc3Ryb25nPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgIFxyXG4gICAgICAgICAgPHRhYmxlIGNsYXNzPVwibW9kdWxlXCIgcm9sZT1cIm1vZHVsZVwiIGRhdGEtdHlwZT1cInRleHRcIiBib3JkZXI9XCIwXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgd2lkdGg9XCIxMDAlXCIgc3R5bGU9XCJ0YWJsZS1sYXlvdXQ6IGZpeGVkO1wiPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzoyMHB4IDE1cHggMzBweCAxNXB4O2xpbmUtaGVpZ2h0OjIycHg7dGV4dC1hbGlnbjppbmhlcml0O1wiXHJcbiAgICAgICAgICAgICAgICAgIGhlaWdodD1cIjEwMCVcIlxyXG4gICAgICAgICAgICAgICAgICB2YWxpZ249XCJ0b3BcIlxyXG4gICAgICAgICAgICAgICAgICBiZ2NvbG9yPVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXY+PHNwYW4gc3R5bGU9XCJjb2xvcjojMzMzMzMzO1wiPkRlYXIgQWRtaW4gLCA8YnIvPiB7e3BhcmFtcy50ZXh0fX08L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgIDxici8+XHJcbiAgICAgICAgICAgIDxkaXY+PHNwYW4gc3R5bGU9XCJjb2xvcjojMzMzMzMzO2ZvbnQtc2l6ZToxNnB4O1wiPlJlcXVlc3RlZCBCeSAgLSB7e3BhcmFtcy5yZXF1ZXN0ZWRCeU5hbWV9fSAoIHt7cGFyYW1zLnJlcXVlc3RlZEJ5RW1haWx9fSApIDwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmY7Y29sb3I6IzdhN2E3YTtmb250LXNpemU6MTFweDtsaW5lLWhlaWdodDoyMHB4O3BhZGRpbmc6MHB4IDBweCAxNXB4IDBweDt0ZXh0LWFsaWduOmNlbnRlclwiPlxyXG4gICAgICAgICAgICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjI0cHg7cGFkZGluZzowIDIwcHg7bWFyZ2luOjA7dGV4dC1hbGlnbjpjZW50ZXJcIj5Db3B5cmlnaHQgwqkgMjAxNS0yMDIyLCBQbGVhY2UgQXdha2VuIC8gSW1wcmVzc3VtLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tW2lmIG1zb10+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD48L3RyPjwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9jZW50ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCFbZW5kaWZdLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9jZW50ZXI+XHJcbiAgICAgICAgPC9ib2R5PlxyXG4gICAgICA8L2h0bWw+YDtcclxuICAgIH1cclxuXHJcbn0iXX0=