<script setup lang="ts">
import {ArrowRight} from "@element-plus/icons-vue";
</script>

<template>
    <el-breadcrumb style="margin-top: 1.1rem; margin-bottom: 1.1rem" :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
</template>