<template>
  <div class="app-container">
    <el-table
      border
      fit
      highlight-current-row
      :data="statistics"
      style="width: 100%;"
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

export default {
  data: () => ({
    statistics: []
  }),
  methods: {
    async getData() {
      rapidapi.get('statistics').then(data => {
        this.statistics = data?.response
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>
