var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationProvider } from '../authentication/authentication';
import { UrlProvider } from '../url/url';
import { DateTime } from '../../shared/helpers/date-time';
import { from } from 'rxjs';
import { DataStoreProvider } from '../data-store/data-store';
import { NetworkStateProvider, ConnectionStatus } from '../network-state/network-state';
import { AppConfigProvider } from '../app-config/app-config';
import { DateTimeProvider } from '../date-time/date-time';
import { timeout } from 'rxjs/operators';
var JournalProvider = /** @class */ (function () {
    function JournalProvider(http, urlProvider, authProvider, dataStore, networkStateProvider, appConfigProvider, dateTimeProvider) {
        var _this = this;
        this.http = http;
        this.urlProvider = urlProvider;
        this.authProvider = authProvider;
        this.dataStore = dataStore;
        this.networkStateProvider = networkStateProvider;
        this.appConfigProvider = appConfigProvider;
        this.dateTimeProvider = dateTimeProvider;
        /**
         * getAndconvertOfflineJournal
         * retrieves the journal data or empties the cache data
         * and returns empty collection if cached data is too old
         * @returns Promise<ExaminerWorkSchedule>
         */
        this.getAndConvertOfflineJournal = function () {
            return _this.dataStore.getItem('JOURNAL')
                .then(function (data) {
                var journalCache = JSON.parse(data);
                var cachedDate = DateTime.at(journalCache.dateStored);
                if (_this.isCacheTooOld(cachedDate, new DateTime())) {
                    return _this.emptyCachedData();
                }
                return journalCache.data;
            })
                .catch(function (error) { return error; });
        };
        /**
         * saveJournalForOffline
         * routine to save the retrieved journal data
         * only saves the data if we have retrieved the data
         * while online
         * @returns Observable
         */
        this.saveJournalForOffline = function (journalData) {
            if (_this.networkStateProvider.getNetworkState() === ConnectionStatus.ONLINE) {
                var journalDataToStore = {
                    dateStored: _this.dateTimeProvider.now().format('YYYY/MM/DD'),
                    data: journalData,
                };
                _this.dataStore.setItem('JOURNAL', JSON.stringify(journalDataToStore)).then(function (response) { });
            }
        };
        /**
         * isCacheTooOld
         * Helper method to determine if the cache data is too old
         * @returns boolean
         */
        this.isCacheTooOld = function (dateStored, now) {
            return dateStored.daysDiff(now) > _this.appConfigProvider.getAppConfig().journal.daysToCacheJournalData;
        };
        /**
         * emptyCachedData
         * overwrites the local storage with empty data
         * and returns empty collection
         */
        this.emptyCachedData = function () {
            var emptyJournalData = {};
            var journalDataToStore = {
                dateStored: _this.dateTimeProvider.now().format('YYYY/MM/DD'),
                data: emptyJournalData,
            };
            _this.dataStore.setItem('JOURNAL', JSON.stringify(journalDataToStore)).then(function () { });
            return emptyJournalData;
        };
    }
    JournalProvider.prototype.getJournal = function (lastRefreshed) {
        var staffNumber = this.authProvider.getEmployeeId();
        var journalUrl = this.urlProvider.getPersonalJournalUrl(staffNumber);
        var networkStatus = this.networkStateProvider.getNetworkState();
        if (lastRefreshed === null) {
            if (!this.authProvider.isInUnAuthenticatedMode() &&
                networkStatus === ConnectionStatus.ONLINE) {
                return this.http.get(journalUrl)
                    .pipe(timeout(this.appConfigProvider.getAppConfig().requestTimeout));
            }
            return this.getOfflineJournal();
        }
        var modifiedSinceValue = lastRefreshed.toUTCString();
        var options = {
            headers: new HttpHeaders().set('If-Modified-Since', modifiedSinceValue),
        };
        if (!this.authProvider.isInUnAuthenticatedMode() && networkStatus === ConnectionStatus.ONLINE) {
            return this.http.get(journalUrl, options)
                .pipe(timeout(this.appConfigProvider.getAppConfig().requestTimeout));
        }
        return this.getOfflineJournal();
    };
    /**
     * getOfflineJournal
     * retrieves the journal from local store when network offline
     * @returns Observable
     */
    JournalProvider.prototype.getOfflineJournal = function () {
        return from(this.getAndConvertOfflineJournal());
    };
    JournalProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            UrlProvider,
            AuthenticationProvider,
            DataStoreProvider,
            NetworkStateProvider,
            AppConfigProvider,
            DateTimeProvider])
    ], JournalProvider);
    return JournalProvider;
}());
export { JournalProvider };
//# sourceMappingURL=journal.js.map