import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 text-balance">
          행맨 미니에 오신 것을 환영합니다
        </h1>
        <p className="text-xl text-muted-foreground mb-8 text-pretty">
          클래식 단어 맞추기 게임에서 당신의 어휘력을 테스트해보세요!
        </p>
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link href="/game">게임 시작</Link>
        </Button>
      </div>

      {/* Game Rules Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">게임 규칙</CardTitle>
            <CardDescription>행맨 미니 게임 방법을 알아보세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">
                  1
                </div>
                <p className="text-sm leading-relaxed">무작위로 선택된 단어가 각 글자를 나타내는 밑줄로 표시됩니다</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">
                  2
                </div>
                <p className="text-sm leading-relaxed">
                  단어를 맞출 수 있는 기회는 <strong>6번</strong>입니다
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">
                  3
                </div>
                <p className="text-sm leading-relaxed">
                  <strong>한 번에 한 글자씩</strong> 추측하세요 - 대소문자는 구분하지 않습니다
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">
                  4
                </div>
                <p className="text-sm leading-relaxed">정답을 맞추면 단어에 있는 해당 글자가 모두 공개됩니다</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">
                  5
                </div>
                <p className="text-sm leading-relaxed">틀린 추측은 남은 기회를 1번 줄입니다</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">
                  6
                </div>
                <p className="text-sm leading-relaxed">기회가 다 떨어지기 전에 모든 글자를 맞춰서 승리하세요!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-secondary">게임 가이드</CardTitle>
            <CardDescription>효과적인 플레이를 위한 팁</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-semibold text-sm mb-1">입력 방법</h4>
                <p className="text-sm text-muted-foreground">키보드로 글자를 입력하거나 추측 버튼을 클릭하세요</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-semibold text-sm mb-1">똑똑한 전략</h4>
                <p className="text-sm text-muted-foreground">
                  일반적인 모음(A, E, I, O, U)과 자주 사용되는 자음(R, S, T, L, N)부터 시작하세요
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-semibold text-sm mb-1">중복 방지</h4>
                <p className="text-sm text-muted-foreground">게임에서 같은 글자를 두 번 추측하는 것을 방지합니다</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-semibold text-sm mb-1">시각적 피드백</h4>
                <p className="text-sm text-muted-foreground">틀린 추측마다 행맨 그림이 진행되는 것을 확인하세요</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/game">게임 시작</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
            <Link href="/reviews">리뷰 보기</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          단어 실력을 테스트할 준비가 되셨나요? "게임 시작"을 클릭해서 시작하세요!
        </p>
      </div>
    </div>
  )
}
