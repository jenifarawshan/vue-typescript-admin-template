<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="filterByValues.continent"
        multiple
        :placeholder="$t('table.continent')"
        class="filter-item"
      >
        <el-option
          v-for="continent in continents"
          :key="continent"
          :label="continent"
          :value="continent"
        ></el-option>
      </el-select>

      <el-select
        v-if="filterByValues.continent.length"
        v-model="filterByValues.country"
        multiple
        :placeholder="$t('table.country')"
        class="filter-item"
      >
        <el-option
          v-for="country in filteredCountries"
          :key="country"
          :label="country"
          :value="country"
        ></el-option>
      </el-select>
    </div>

    <el-table
      border
      fit
      highlight-current-row
      :data="filteredStatistics"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        :label="$t('table.continent')"
        prop="continent"
      />
      <el-table-column
        align="center"
        :label="$t('table.country')"
        prop="country"
      />
      <el-table-column
        align="center"
        :label="$t('table.population')"
        prop="population"
      />
      <el-table-column
        align="center"
        :label="$t('table.newCases')"
        prop="cases.new"
      />
      <el-table-column
        align="center"
        :label="$t('table.activeCases')"
        prop="cases.active"
      />
      <el-table-column
        align="center"
        :label="$t('table.criticalCases')"
        prop="cases.critical"
      />
      <el-table-column
        align="center"
        :label="$t('table.recoveredCases')"
        prop="cases.recovered"
      />
      <el-table-column
        align="center"
        :label="$t('table.totalCases')"
        prop="cases.total"
      />
      <el-table-column
        align="center"
        :label="$t('table.newDeaths')"
        prop="deaths.new"
      />
      <el-table-column
        align="center"
        :label="$t('table.totalDeaths')"
        prop="deaths.total"
      />
      <el-table-column
        align="center"
        :label="$t('table.totalTests')"
        prop="tests.total"
      />
    </el-table>
  </div>
</template>

<script>
import rapidapi from '@/utils/rapidapi'
import { Covid19Module } from '@/store/modules/covid19'

export default {
  data: () => ({
    filterByValues: {
      continent: [],
      country: []
    },
    continents: [],
    countries: [],
    statistics: []
  }),
  computed: {
    filteredCountries() {
      const items = this.statistics.filter((item) =>
        this.filterByValues.continent.includes(item?.continent)
      )
      const countries = []
      items.forEach((item) => {
        countries.push(item?.country)
      })
      return countries
    },
    filteredStatistics() {
      let items = [...this.statistics]

      for (const val in this.filterByValues) {
        if (this.filterByValues[val].length > 0) {
          items = items.filter((item) =>
            this.filterByValues[val].includes(item[val])
          )
        }
      }
      return items
    }
  },
  methods: {
    async getData() {
      if (Covid19Module.getStatistics.length === 0) {
        await rapidapi.get('statistics').then((data) => {
          Covid19Module.setStatistics(data?.response)
        })
      }
      this.statistics = Covid19Module.getStatistics
      this.statistics.forEach((item) => {
        if (!this.continents.includes(item?.continent)) {
          this.continents.push(item?.continent)
        }
        this.countries.push(item?.country)
      })
    }
  },
  created() {
    this.getData()
  },
  watch: {
    'filterByValues.continent'() {
      this.filterByValues.country = this.filterByValues.country.filter(
        (country) => this.filteredCountries.includes(country)
      )
    }
  }
}
</script>
