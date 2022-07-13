---
# Documentation: https://wowchemy.com/docs/managing-content/

title: Toward the automatic classification of self-affirmed refactoring
subtitle: ''
summary: ''
authors:
- Eman Abdullah AlOmar
- Mohamed Wiem Mkaouer
- Ali Ouni
tags: []
categories: []
date: '2021-01-01'
lastmod: 2022-01-26T01:31:22-05:00
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ''
  focal_point: ''
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
publishDate: '2022-01-26T06:31:20.520818Z'
publication_types:
- '2'
abstract: 'The concept of Self-Affirmed Refactoring (SAR) was introduced to explore how developers document their refactoring activities in commit messages, i.e., developers explicit documentation of refactoring operations intentionally introduced during a code change. 
In our previous study, we have manually identified refactoring patterns and defined three main common quality improvement categories including internal quality attributes, external quality attributes, and code smells, by only considering refactoring-related commits. However, this approach heavily depends on the manual inspection of commit messages. In this paper, we propose a two-step approach to first identify whether a commit describes developer-related refactoring events, then to classify it according to the refactoring common quality improvement categories. Specifically, we combine the N-Gram TF-IDF feature selection with binary and multiclass classifiers to build a new model to automate the classification of refactorings based on their quality improvement categories. We challenge our model using a total of 2,867 commit messages extracted from well engineered open-source Java projects. Our findings show that (1) our model is able to accurately classify SAR commits, outperforming the pattern-based and random classifier approaches, and allowing the discovery of 40 more relevant SAR patterns, and (2) our model reaches an F-measure of up to 90% even with a relatively small training dataset.'
publication: '*Journal of Systems and Software*'
---
