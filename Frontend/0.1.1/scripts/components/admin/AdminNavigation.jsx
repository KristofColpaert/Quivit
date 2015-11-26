'use strict';

var React = require('react'),
    Link = require('react-router').Link;

var AdminNavigation = React.createClass({
   render : function() {
       return (
           <section classNam="adminNavigation">
               <ul>
                   <li>Games
                       <ul>
                           <li><Link to="/">New</Link></li>
                           <li><Link to="/">Manage</Link></li>
                       </ul>
                   </li>
                   <li>Teams
                       <ul>
                           <li><Link to="/">New</Link></li>
                           <li><Link to="/">Manage</Link></li>
                       </ul>
                   </li>
                   <li>Players
                       <ul>
                           <li><Link to="/">New</Link></li>
                           <li><Link to="/">Manage</Link></li>
                       </ul>
                   </li>
               </ul>
           </section>
       );
   }
});

module.exports = AdminNavigation;