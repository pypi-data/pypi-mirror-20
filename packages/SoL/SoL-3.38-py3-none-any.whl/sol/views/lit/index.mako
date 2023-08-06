## -*- coding: utf-8 -*-
## :Project:   SoL
## :Created:   mer 17 dic 2008 02:16:28 CET
## :Author:    Lele Gaifax <lele@metapensiero.it>
## :License:   GNU General Public License version 3 or later
## :Copyright: © 2008, 2009, 2010, 2013, 2014, 2016 Lele Gaifax
##

<%inherit file="base.mako" />

<%
from operator import attrgetter
%>

<%def name="title()">
  ${_('SoL Lit')}
</%def>

## Body

<dl>
  <dt>${_('Clubs')}</dt>
  <dd>
    ${nclubs}
    (${ngettext('%d country', '%d countries', nccountries) % nccountries})
  </dd>
  <dt>${_('Federations')}</dt> <dd>${nfederations}</dd>
  <dt>${_('Championships')}</dt> <dd>${nchampionships}</dd>
  <dt>${_('Tourneys')}</dt>
  <dd>${ntourneys} (<a href="${request.route_path('lit_latest', _query=dict(n=20))|n}">${_('latest 20')}</a>)</dd>
  <dt>${_('Players')}</dt>
  <dd>
    <a href="${request.route_path('lit_players')}">${nplayers}</a>
    (<a href="${request.route_path('svg_playersdist') | n}">${ngettext('%d country', '%d countries', npcountries) % npcountries}</a>)
  </dd>
  <dt>${_('Ratings')}</dt> <dd>${nratings}</dd>
</dl>

<div class="centered multi-columns">
% for index, (country, code) in enumerate(sorted(clubsbycountry)):
  <h3>
    % if code:
    <img src="/static/images/flags/${code}.png" />
    % endif
    ${country}
  </h3>
  % for club in sorted(clubsbycountry[(country, code)], key=attrgetter('description')):
  <p class="${'federation' if club.isfederation else 'club'}">
    <a href="${request.route_path('lit_club', guid=club.guid) | n}">${club.description}</a>
    <br>
    <% nc = club.countChampionships() %>
    <% np = club.countPlayers() %>
    % if nc and np:
    (${ngettext('%d championship', '%d championships', nc) % nc},
     <a href="${request.route_path('lit_club_players', guid=club.guid) | n}">${ngettext('%d player', '%d players', np) % np}</a>)
    % else:
     % if nc:
    (${ngettext('%d championship', '%d championships', nc) % nc})
     % else:
    (<a href="${request.route_path('lit_club_players', guid=club.guid) | n}">${ngettext('%d player', '%d players', np) % np}</a>)
     % endif
    % endif
  </p>
  % endfor
  </ul>
% endfor
</div>
