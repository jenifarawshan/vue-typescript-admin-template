import {
  VuexModule,
  Module,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'

export interface ICovid19State {
  countryList: string[]
  statistics: {[key: string]: any}[]
  history: { [key: string]: [] }
}

@Module({ dynamic: true, store, name: 'covid19' })
class Covid19 extends VuexModule implements ICovid19State {
  countryList: ICovid19State['countryList'] = [];
  statistics: ICovid19State['statistics'] = [];
  history: ICovid19State['history'] = {};

  public get getCountryList(): ICovid19State['countryList'] {
    return this.countryList
  }

  public get getStatistics(): ICovid19State['statistics'] {
    return this.statistics
  }

  public get getHistory(): ICovid19State['history'] {
    return this.history
  }

  @Mutation
  public setCountryList(countryList: ICovid19State['countryList']) {
    this.countryList = countryList
  }

  @Mutation
  public setStatistics(statistics: ICovid19State['statistics']) {
    this.statistics = statistics
  }

  @Mutation
  public setCountryInHistory(countryData: {name: string, history: []}) {
    this.history[countryData.name] = countryData.history
  }
}

export const Covid19Module = getModule(Covid19)
