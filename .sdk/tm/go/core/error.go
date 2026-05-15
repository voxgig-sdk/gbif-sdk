package core

type GbifError struct {
	IsGbifError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewGbifError(code string, msg string, ctx *Context) *GbifError {
	return &GbifError{
		IsGbifError: true,
		Sdk:              "Gbif",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *GbifError) Error() string {
	return e.Msg
}
