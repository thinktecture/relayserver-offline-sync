# Data Sync for Apps: With Offline Support, but Without Cloud

This repository contains a showcase for synchronizing on-premises data including offline support, powered by PouchDB, Ionic 2 and Thinktecture RelayServer.

## Repository Structure
* `server` – working directory of the PouchDB Server, its files will be placed here
* `connector` – placeholder directory where build artifacts of Thinktecture RelayServer On-Premises Connector Service should be placed
* `client` – source files of the Ionic 2 client app live here

## Prerequisites
* Not surprisingly, you need [Node.js](https://nodejs.org/) and Node Package Manager installed
* Running instance of Thinktecture RelayServer
  * Requires RabbitMQ and Microsoft SQL Server
* Build of Thinktecture RelayServer On-Premises Connector Service
  * .NET application 
  * Integrating RelayServer into applications is an architectural decision. Therefore, the Connector Service is not a part of the pre-built RelayServer release and it has to be built/integrated manually.
  * Clone [this repository](https://github.com/thinktecture/relayserver) and build the `Thinktecture.RelayServer` solution
  * Copy the build output of `Thinktecture.RelayServer.OnPremisesConnector` over to the target machine (preferably the `connector` directory of this repository)
* If you want to build/execute the client, Ionic 2 (Beta) needs to be installed globally by running `npm i -g ionic@beta`

## Setup
![Mobile Data Access using Thinktecture RelayServer](https://raw.githubusercontent.com/thinktecture/relayserver/master/Documentation/de/assets/1-herausfoderung-mobiler-datenzugriff.png)

* Please run `npm i` first.
* Relay Server
  * Public facing
  * Can be hosted anywhere (inhouse, hoster, …)
  * Refer to the [RelayServer documentation (German)](https://github.com/thinktecture/relayserver/tree/master/Documentation) for installing and running RelayServer
* Local On-Premises Device
  * Connects to Relay Server using the Thinktecture RelayServer Connector Service (.NET or Mono runtime required)
  * Only outgoing connections to port 443 (HTTPS) must be allowed
  * Not public facing
  * Contains private data, here provided by PouchDB Server (*On-Premises Application*)
  * Run the connector by launching its executable (.NET or Mono runtime required), e.g. by calling `npm run connector` (.NET) or `npm run connector-mono` (Mono) respectively
  * Run PouchDB Sever by launching its executable, e.g. by calling `npm run pouchdb-server`
* Mobile Device (or any other remote client)
  * Connects to Relay Server which is connected to the on-premises data storage
  * Support for editing data offline and synchronizing it with the remote database
  * Please set the `remote` property of the `Data` service in `client/app/providers/data/data.js` to the remote database endpoint (e.g. `https://example.com/relay/raspberry-pi/pouchdb/pizzas/`)
  * Run the client by navigating to the `client` directory and execute `ionic serve`
  * To run the client on a mobile device, add the target platforms using `ionic platform add <platform>` (`ios`, `android` or `windows`) and run `ionic run <platform> --device`

## Dependencies
* [PouchDB Server](https://github.com/pouchdb/pouchdb-server), CouchDB-compatible HTTP server using PouchDB and Node.js
* [Thinktecture RelayServer](https://github.com/thinktecture/relayserver), enabling bidirectional, secure communication between on-premises applications and mobile clients
* [Ionic 2](http://ionic.io/2), advanced HTML5 mobile development framework and SDK
  * [Angular 2](https://angular.io), development platform for building mobile and desktop web applications
  * [PouchDB](https://pouchdb.com/), a pocket-sized database

## Live and in Color

This sample is/was presented at the following conferences/meetups.

* [RheinNeckarJS](http://www.meetup.com/de-DE/RheinNeckarJS/events/229339247/), April 27, 2016, 20:00, Mafinex, Mannheim.
* [DeveloperWeek 2016](http://www.developer-week.de/Programm/Veranstaltung/(event)/20563), June 20, 2016, 14:15, Nuremberg Conference Center, Nuremberg.

## Further Reading
* [Weyer, Christian: Offline-First Architectures for HTML5 Apps (German)](https://speakerdeck.com/christianweyer/auch-ohne-netz-offline-first-architekturen-fur-html5-apps)
* [Morony, Josh: Syncing Data with PouchDB and Cloudant in Ionic 2](http://www.joshmorony.com/syncing-data-with-pouchdb-and-cloudant-in-ionic-2/)
* [Thinktecture RelayServer Documentation (German)](https://github.com/thinktecture/relayserver/tree/master/Documentation)
* [PouchDB Documentation](https://pouchdb.com/guides/)
* [Ionic 2 Documentation](http://ionicframework.com/docs/v2/)

## Known Issues
* Installing `pouchdb-server` using a current version of Node.js will fail on Debian 7 (Wheezy). Either use an older version of Node.js (e.g. 0.10) or [update your version of GCC](https://github.com/mapbox/node-sqlite3/issues/509).
* Live/continuous replication is unsupported as RelayServer doesn’t support Long Polling.
