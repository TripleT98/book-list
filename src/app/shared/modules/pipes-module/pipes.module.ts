import { NgModule } from '@angular/core';
import { GetErrorMessagePipe } from './get-err-mess.pipe';
import { GetBookInfoPipe } from './get-book-info.pipe';
import { TransformLangNamePipe } from './transfom-lang-name.pipe';

const pipes = [
  GetErrorMessagePipe,
  GetBookInfoPipe,
  TransformLangNamePipe
]

@NgModule({
  declarations: [...pipes],
  imports: [],
  exports: [...pipes]
})
export class PipesModule {}
