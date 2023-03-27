---
excerpt: "Mastering the game of Go with deep neural networks and tree search. 를 읽고 정리하기."
tag: [papaer, ai]
use_math: true
---

## Markov Games



## Policies

밑에 첨자인 그리스문자는 network layer 의 parameter 같은걸 의미하는 듯. 

Monte Carlo rollouts 에서 사용됨.

$$p_\omicron$$
+ 프로기사 데이터로 Supervised Learning 함. 
+ 데이터를 가지고 다음 수를 예측하면서 정확도 체크.
+ 속도와 타협해 13-layered network 를 사용해 대략 57% 나온다고 함(당시 잘나온거 44.4%).
+ 후자는 rol $$\pi$$ 가중치로 

$$p_\pi$$ 
+ $$p_\omicron$$ 이랑 비슷하지면 빠른 속도를 위한 것.
+ feature 을 작게해 linear softmax(만?) 썼다고 함. (다음 행동 선택하는데 3ms => 2us)
+ 24% 나온다고 함.

$$p_\rho$$
+ %%\rho$$ 를 $$\omicron$$ 로 초기화시킴.
+ Prev Policy Networks 중에 랜덤으로 골라서 대결하는 식으로 Reinforcement Learning 돌림. 이전 정책 풀에서 랜덤으로 선택하면 오버피팅 방지된다함.

## Value Functions

$$v^p(s) = \mathrm{E}[z_t \vert s_t = s, a_t ... T ~p]$$

$$v^*(s)$$
+ The optimal value function uner perfect play.

$$v_\theta$$
+ value function. $$p_\rho$$ 사용해서 최종 승패에 따라서 백프로파게이션? 하는듯

$$v_\theta(s) \approx v^{p_\rho} \approx v^*(s)$$


## MCTS


## ㅁㄴㅇㄹ

Convolutional Layers with weights $$\omicron$$, rectifier nonlinearities. 를 번갈아가면서 사용.

The input s to the policy network is a simple representation of the board state.

A final softmax layer outputs a probability distribution over all legal moves a.

The policy network is trained on randomly sampled state-action pairs (s, a), using stochastic gradient ascent to maximize the likelihood of the human move a selected in state s


## 참고자료

[Deepmind, 2016. Mastering the game of Go with deep neural networks and tree search.](https://storage.googleapis.com/deepmind-media/alphago/AlphaGoNaturePaper.pdf)

[MicLittman, M. L. 1994. Markov games as a framework for multi-agent reinforcement learning](https://courses.cs.duke.edu/spring07/cps296.3/littman94markov.pdf)

[brilee/Mugo](https://github.com/brilee/MuGo/blob/master/go.py) 
+ 이 논문 이후의 논문들이 반영되어 있는 오픈소스인 [tensorflow/Minigo](https://github.com/tensorflow/minigo) 의 기초버전이다. 