---
layout: default
title: Publons
---


<style>
     * {
         padding: 0;
         margin: 0;
         font-size: 0;
         line-height: 1;
         text-decoration: none;
         outline: none;
         border: none;
         font-family: 'Roboto', sans-serif;
         vertical-align: top;
         display: block;
         box-sizing: border-box;
         color: #111;
     }
     a,
     a * {
         cursor: pointer;
     }
     .more-journals {
         font-size: 11px;
         color: #333;
         padding-top: 5px;
     }
     html,
     body,
     .container {
         background-color: #fff;
         width: 640px;
         max-width: 100%;
     }
     hr {
         padding: 0 15px;
         width: 100%;
         border-bottom: 1px solid #eee;
         margin: 15px 0;
         margin-left: -15px;
         box-sizing: content-box;
     }
     @media all and (max-height: 320px) {
         hr {
             padding: 0 10px;
             margin: 10px 0;
             margin-left: -10px;
         }
     }
     .container {
         padding: 15px;
         border: 2px solid #eee;
         position: relative;
         display: block;

         padding-bottom: 30px;
         /* For footer */
     }
     @media all and (max-height: 320px) {
         .container {
             padding: 10px;
         }
     }
     .header {
         position: relative;
         margin-bottom: 15px;
     }
     .logo img {
         height: 50px;
     }
     @media all and (max-width: 320px) {
         .logo img {
             height: 40px;
         }
     }
     .logo {
         position: absolute;
         left: 0;
         top: 0;
     }
     /* Publishing name */

     .header h1 {
         font-size: 28px;
         padding-bottom: 5px;
     }
     @media all and (max-width: 320px) {
         .header h1 {
             font-size: 20px;
             padding-bottom: 6px;
         }
     }
     /* Widget title */

     .header h1,
     .header h2 {
         padding-left: 65px;
         font-weight: 500;
     }
     @media all and (max-width: 320px) {
         .header h1,
         .header h2 {
             padding-left: 50px;
             font-weight: 500;
         }
     }
     .header h2 {
         font-size: 16px;
         font-weight: 100;
     }
     @media all and (max-width: 320px) {
         .header h2 {
             font-size: 12px;
             font-weight: 400;
         }
     }
     /*******************/

     .legend {
         margin-bottom: 20px;
         padding: 5px 15px 5px 0;
         background-color: #fcfcfc;
         border: 1px solid #eee;
         display: inline-block;
     }
     @media all and (max-height: 320px) {
         .legend {
             margin-bottom: 15px;
             padding: 0px 10px 0 0;
         }
     }
     @media all and (max-height: 280px) {
         .legend {
             display: none;
         }
     }
     .legend > div {
         margin: 5px 0;
         display: inline-block;
         margin-left: 15px;
     }
     .legend > div label {
         font-size: 14px;
         line-height: 17px;
         display: inline-block;
     }
     @media all and (max-width: 320px) {
         .legend > div label {
             font-size: 12px;
             line-height: 17px;
             display: inline-block;
         }
     }
     .legend-key {
         border-top: 1px solid rgba(255, 255, 255, 0.1);
         border-bottom: 1px solid rgba(0, 0, 0, 0.1);
         border-right: 1px solid rgba(0, 0, 0, 0.1);
         border-left: 1px solid rgba(255, 255, 255, 0.1);
         width: 14px;
         height: 14px;
         margin: 0px;
         display: inline-block;
         margin-right: 6px;
         border-radius: 4px;
     }
     .legend > div:nth-child(1) .legend-key {
         background-color: #336699;
     }
     .legend > div:nth-child(2) .legend-key {
         background-color: #dddddd;
     }
     .legend > div:nth-child(3) .legend-key {
         background-color: #5bc0de;
     }
     .legend > div:nth-child(4) .legend-key {
         background-color: #773399;
     }
     /*****************/

     @media all and (max-height: 320px) {
         .stats {
             padding-bottom: 10px;
         }
     }
     .metric {
         margin-bottom: 20px;
     }

     .horizontal-bar-graph label {
         font-size: 16px;
         margin-bottom: 10px;
         display: block;
         font-weight: 500;
     }
     @media all and (max-width: 320px) {
         .horizontal-bar-graph label {
             font-size: 12px;
             font-weight: 500;
             margin-bottom: 8px;
             display: block;
         }
     }
     .horizontal-bar-graph .bars {
         /*background-color: #eee;*/

         width: 100%;
         border-radius: 3px;
         overflow: hidden;
         padding-right: 60px;
         box-sizing: border-box;
     }
     .horizontal-bar-graph .bar {
         position: relative;
     }
     .horizontal-bar-graph .bar-percentage {
         height: 16px;
         border-top: 1px solid rgba(255, 255, 255, 0.1);
         border-bottom: 1px solid rgba(0, 0, 0, 0.1);
         border-right: 1px solid rgba(0, 0, 0, 0.1);
         border-left: 1px solid rgba(255, 255, 255, 0.1);
         display: inline-block;
         max-width: 100%;
         border-radius: 3px;
         overflow: hidden;
         border-top-left-radius: 0;
         border-bottom-left-radius: 0;
     }
     .horizontal-bar-graph .bar:nth-child(1) .bar-percentage {
         background-color: #336699;
     }
     .horizontal-bar-graph .bar:nth-child(2) .bar-percentage {
         background-color: #dddddd;
     }
     .horizontal-bar-graph .bar:nth-child(3) .bar-percentage {
         background-color: #5bc0de;
     }
     .horizontal-bar-graph .bar:nth-child(4) .bar-percentage {
         background-color: #773399;
     }
     @media all and (max-height: 280px) {
         .horizontal-bar-graph .bar {
             display: none;
         }
         .horizontal-bar-graph .bar:nth-child(1) {
             display: block;
         }
     }
     .horizontal-bar-graph .bar-label {
         display: inline-block;
         font-size: 10px;
         line-height: 16px;
         margin-left: 5px;
         position: absolute;
         font-weight: 500;
         letter-spacing: 0.8px;
         color: #111;
         top: 0;
     }
     /****************/

     .journals-reviewed-for {
         padding-bottom: 10px;
     }
     @media all and (max-height: 320px) {
         .journals-reviewed-for {
             display: none;
         }
         .content hr {
             display: none;
         }
     }
     .journals-reviewed-for h3 {
         font-size: 16px;
         /*letter-spacing: 1px;*/

         margin-bottom: 15px;
         font-weight: 500;
         /*color: #777;*/
         /*border-bottom: 1px solid #ccc;*/
     }
     .journal {
         margin-bottom: 5px;
         overflow: hidden;
         border-radius: 4px;
     }
     .journal > div {
         position: relative;
         background-color: #fafafa;
         width: auto;
         /*display: inline-block;*/

         padding-right: 15px;
         max-width: 100%;
     }
     .journal-logo {
         position: absolute;
         top: 0;
         left: 0;
     }
     .journal-logo img {
         height: 30px;
         width: 30px;
     }
     .journal-name {
         font-size: 10px;
         font-weight: 500;
         text-transform: uppercase;
         letter-spacing: 0.8px;
         line-height: 30px;
         padding-left: 40px;
         white-space: nowrap;
         overflow-x: hidden;
         text-overflow: ellipsis;
     }
     .footer {
         background-color: #fcfcfc;
         border-top: 2px solid #eee;
         position: absolute;
         bottom: 0;
         left: 0;
         width: 100%;
         padding: 8px 10px;
     }
     .footer p {
         letter-spacing: 0.4px;
         font-size: 10px;
         color: #555;
         text-align: left;
     }
     .footer a {
         letter-spacing: 0.4px;
         font-size: 10px;
         color: #111 !important;
         text-decoration: underline;
         display: inline;
     }
    </style>



<div class="container" ><a href="/researcher/1540034/mohamed-wiem-mkaouer/" class="header" target="_blank"><div class="logo"><img src="https://publons.com/static/images/logos/square/blue_white_shadow.png" alt="logo"></div><h1>Mohamed Wiem Mkaouer</h1><h2>Publons Peer Review Profile</h2><div class="view-profile-link"></div></a><hr><a href="/researcher/1540034/mohamed-wiem-mkaouer/" class="content" target="_blank"><div class="stats"><div class="legend"><div><span class="legend-key"></span><label>
                  Mohamed Wiem Mkaouer
                </label></div><div><span class="legend-key"></span><label>
                  Global average
                </label></div></div><div class="metric"><div class="horizontal-bar-graph"><label>Verified reviews performed in the last 12 months</label><div class="bars"><div class="bar"><span class="bar-percentage" style="width: 86.79245283018868%"></span><span class="bar-label" style="left: 86.79245283018868%">
                        23
                      </span></div><div class="bar"><span class="bar-percentage" style="width: 13.20754716981132%"></span><span class="bar-label" style="left: 13.20754716981132%">
                        3.5
                      </span></div></div></div></div></a><hr><a href="/researcher/1540034/mohamed-wiem-mkaouer/" class="journals-reviewed-for" target="_blank"><h3>Journals reviewed for</h3><div class="journal"><div><span class="journal-logo"><img src="https://publons.com/media/thumbs/journal/logos/9ceaffe938694c5d933341cbbab1dd09.png.30x30_q95_detail_letterbox_upscale.png" alt="Applied Sciences logo"></span><span class="journal-name">
                  Applied Sciences
                  </span></div></div><div class="journal"><div><span class="journal-logo"><img src="https://publons.com/media/thumbs/journal/logos/21d8db6181f145868f72451b3d07d233.png.30x30_q95_detail_letterbox_upscale.png" alt="Computers logo"></span><span class="journal-name">
                  Computers
                  </span></div></div><div class="journal"><div><span class="journal-logo"><img src="https://publons.com/media/thumbs/publishers/logos/267ded92-ab8f-4402-b7dd-040004ae27c0.png.30x30_q95_detail_letterbox_upscale.png" alt="Applied Soft Computing logo"></span><span class="journal-name">
                  Applied Soft Computing
                  </span></div></div><div class="journal"><div><span class="journal-logo"><img src="https://publons.com/media/thumbs/publishers/logos/2fd0a790-aeca-4851-a591-2e89f2841721.png.30x30_q95_detail_letterbox_upscale.png" alt="IEEE Transactions on Software Engineering logo"></span><span class="journal-name">
                  IEEE Transactions on Software Engineering
                  </span></div></div><div class="journal"><div><span class="journal-logo"><img src="https://publons.com/media/thumbs/publishers/logos/ad5c9e18-b079-441d-8a1f-dc922b2baed3.png.30x30_q95_detail_letterbox_upscale.png" alt="Memetic Computing logo"></span><span class="journal-name">
                  Memetic Computing
                  </span></div></div><p class="more-journals">... and 9 other journals</p></div></a><div class="footer"><p>&copy; 2016-2020 Publons</p></div></div>
