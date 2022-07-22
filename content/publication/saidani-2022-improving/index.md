---
# Documentation: https://wowchemy.com/docs/managing-content/

title: 'Improving the prediction of continuous integration build failures using deep learning'
subtitle: ''
summary: ''
authors:
- Islem Saidani
- Ali Ouni
- Mohamed Wiem Mkaouer
tags: []
categories: []
date: '2022-04-29'
lastmod: 2022-04-29T01:31:43-05:00
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
publishDate: '2022-04-29T06:31:41.642520Z'
publication_types:
- '2'
abstract: 'Continuous Integration (CI) aims at supporting developers in integrating code changes constantly and quickly through an automated build process.
  However, the build process is typically time and resource-consuming as running failed builds can take hours until discovering the breakage; which may cause disruptions in the development process and delays in the product release dates.
  Hence, preemptively detecting when a software state is most likely to trigger a failure during the build is of crucial importance for developers. Accurate build failures prediction techniques can
  cut the expenses of CI build cost by early predicting its potential failures. However, developing accurate prediction models is a challenging task as it requires learning
  long- and short-term dependencies in the historical CI build data as well as extensive feature engineering to derive informative features to learn from. In this paper,
  we introduce DL-CIBuild a novel approach that uses Long Short-Term Memory(LSTM)-based Recurrent Neural Networks (RNN) to construct prediction models
  for CI build outcome prediction. The problem is comprised of a single series of CI build outcomes and a model is required to learn from the series of past observations
  to predict the next CI build outcome in the sequence. In addition, we tailor Genetic Algorithm (GA) to tune the hyper-parameters for our LSTM model. We evaluate our
  approach and investigate the performance of both cross-project and online prediction scenarios on a benchmark of 91,330 CI builds from 10 large and long-lived software
  projects that use the Travis CI build system. The statistical analysis of the obtained results shows that the LSTM-based model outperforms traditional Machine Learning
  (ML) models with both online and cross-project validations. DL-CIBuild has shown also a less sensitivity to the training set size and an efective robustness to the concept drift. 
  Additionally, by considering several Hyper-Parameter Optimization (HPO)methods as baseline for GA, we demonstrate that the latter performs the best'
publication: '*Automated Software Engineering*'
---
