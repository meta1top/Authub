
## 🔧 本地开发配置

如果需要在本地开发时覆盖某些依赖包，添加需要覆盖的配置

```json
{
  "pnpm": {
    "overrides": {
      "@meta-1/nest-security": "file:../support/libs/security"
    }
  }
}
```

详细说明请参考项目中的本地配置文档。