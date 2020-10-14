# graphql-server

```graphql
query {
  hello
  helloTwo
  product(id: "abc") {
    name
    description(format: TEXT, locale: FR)
    imageUrl
    image {
      url
      thumbnailUrl(width: 600, height: 600)
    }
  }
}
```

```json
{
  "data": {
    "hello": "mock string",
    "helloTwo": "Real hello",
    "product": {
      "name": "mock string",
      "description": "bonjour le monde",
      "imageUrl": null,
      "image": {
        "url": "https:///www.example.com/abc.png",
        "thumbnailUrl": "https:///www.example.com/abc-xs-xs.png"
      }
    }
  }
}
```