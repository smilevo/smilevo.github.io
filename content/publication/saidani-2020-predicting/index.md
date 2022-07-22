---
# Documentation: https://wowchemy.com/docs/managing-content/

title: Predicting continuous integration build failures using evolutionary search
subtitle: ''
summary: ''
authors:
- Islem Saidani
- Ali Ouni
- Moataz Chouchen
- Mohamed Wiem Mkaouer
tags: []
categories: []
date: '2020-01-01'
lastmod: 2022-01-26T01:31:18-05:00
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
publishDate: '2022-01-26T06:31:15.776888Z'
publication_types:
- '2'
abstract: 'Context: Continuous Integration (CI) is a common practice in modern software development and it is increasingly adopted in the open-source as well as the
  software industry markets. CI aims at supporting developers in integrating code changes constantly and quickly through an automated build process. However,
  in such context, the build process is typically time and resource-consuming which requires a high maintenance effort to avoid build failure.
  Objective: The goal of this study is to introduce an automated approach to cut the expenses of CI build time and provide support tools to developers by
  predicting the CI build outcome.
  Method: In this paper, we address problem of CI build failure by introducing a novel search-based approach based on Multi-Objective Genetic Programming
  (MOGP) to build a CI build failure prediction model. Our approach aims at finding the best combination of CI built features and their appropriate threshold
  values, based on two conflicting objective functions to deal with both failed and passed builds.
  Results: We evaluated our approach on a benchmark of 56,019 builds from 10 large-scale and long-lived software projects that use the Travis CI build system.
  The statistical results reveal that our approach outperforms the state-of-the-art techniques based on machine learning by providing a better balance between both failed and passed builds.
  Furthermore, we use the generated prediction rules to investigate which factors impact the CI build results, and found that
  features related to (1) the types of changed files in the current build, (2) last build information and (3) specific statistics about the project, such as team size,
  are the most influential to indicate the potential failure of a given build.
  Conclusion: This paper proposes a multi-objective search-based approach for the the problem of CI build failure prediction. 
  The performances of the models developed using our MOGP approach were statistically better than models developed using machine learning techniques. 
  The experimental results show that our approach can effectively reduce both false negative rate and false positive rate of CI build failures in highly imbalanced datasets.
  Keywords: Continuous Integration, Build Prediction, Multi-Objective Optimization, Search-Based Software Engineering, Machine Learning'
publication: '*Information and Software Technology*'
---
