/*
 * Achei: Stolen Object Tracking System.
 * Copyright (C) 2025  Team Achei
 * 
 * This file is part of Achei.
 * 
 * Achei is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Achei is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Achei.  If not, see <https://www.gnu.org/licenses/>.
 * 
 * Contact information: teamachei.2024@gmail.com
*/

import type React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import styled from "styled-components"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Textarea } from "@/app/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

const categories = [
  { value: "eletronico", label: "Eletrônico" },
  { value: "veiculo", label: "Veículo" },
  { value: "outro", label: "Outro" },
]

interface FormValues {
  categoria: string
  nome: string
  descricao: string
  marca: string
  modelo: string
  dataAquisicao: string // Keep this as string for the input field
  numeroSerie?: string
  imei?: string
  chassi?: string
  situacao: string
  notaFiscal: File | null
  imagens: FileList | null
}

const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object().shape({
  categoria: Yup.string().required("Categoria é obrigatória"),
  nome: Yup.string().required("Nome é obrigatório"),
  descricao: Yup.string().required("Descrição é obrigatória"),
  marca: Yup.string().required("Marca é obrigatória"),
  modelo: Yup.string().required("Modelo é obrigatória"),
  dataAquisicao: Yup.string()
    .required("Data de aquisição é obrigatória")
    .test("is-date", "Data inválida", (value) => !value || !isNaN(Date.parse(value))),
  numeroSerie: Yup.string().when("categoria", {
    is: "eletronico",
    then: (schema) => schema.required("Número de série é obrigatório para eletrônicos"),
    otherwise: (schema) => schema.notRequired(),
  }),
  imei: Yup.string().when("categoria", {
    is: "eletronico",
    then: (schema) => schema.required("IMEI é obrigatório para telefones e notebooks"),
    otherwise: (schema) => schema.notRequired(),
  }),
  chassi: Yup.string().when("categoria", {
    is: "veiculo",
    then: (schema) => schema.required("Chassi é obrigatório para veículos"),
    otherwise: (schema) => schema.notRequired(),
  }),
  situacao: Yup.string().required("Situação é obrigatória"),
  notaFiscal: Yup.mixed<File>().nullable(),
  imagens: Yup.mixed<FileList>().nullable(),
})

const SelectContentStyled = styled(SelectContent)`
  z-index: 1000;
  position: relative;
  background-color: #ffffff; /* Cor de fundo desejada */
  border: 1px solid #ccc; /* Borda */
  border-radius: 0.25rem; /* Bordas arredondadas */
`

const CadastrarTab: React.FC = () => {
  const initialValues: FormValues = {
    categoria: "",
    nome: "",
    descricao: "",
    marca: "",
    modelo: "",
    dataAquisicao: "",
    numeroSerie: "",
    imei: "",
    chassi: "",
    situacao: "",
    notaFiscal: null,
    imagens: null,
  }

  const handleSubmit = (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    console.log("Objeto cadastrado:", values)
    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    setSubmitting(false)
  }

  return (
    <div className="w-full min-h-full p-6">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Cadastrar Novo Objeto</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="categoria" className="text-sm font-medium">
                        Categoria
                      </Label>
                      <Select name="categoria" onValueChange={(value) => setFieldValue("categoria", value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContentStyled>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContentStyled>
                      </Select>
                      <ErrorMessage name="categoria" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="nome" className="text-sm font-medium">
                        Nome do Objeto
                      </Label>
                      <Field as={Input} type="text" id="nome" name="nome" className="w-full" />
                      <ErrorMessage name="nome" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="descricao" className="text-sm font-medium">
                        Descrição
                      </Label>
                      <Field as={Textarea} id="descricao" name="descricao" className="w-full h-24" />
                      <ErrorMessage name="descricao" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="marca" className="text-sm font-medium">
                          Marca
                        </Label>
                        <Field as={Input} type="text" id="marca" name="marca" className="w-full" />
                        <ErrorMessage name="marca" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="modelo" className="text-sm font-medium">
                          Modelo
                        </Label>
                        <Field as={Input} type="text" id="modelo" name="modelo" className="w-full" />
                        <ErrorMessage name="modelo" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dataAquisicao" className="text-sm font-medium">
                        Data de Aquisição
                      </Label>
                      <Field as={Input} type="date" id="dataAquisicao" name="dataAquisicao" className="w-full" />
                      <ErrorMessage name="dataAquisicao" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {values.categoria === "eletronico" && (
                      <>
                        <div>
                          <Label htmlFor="numeroSerie" className="text-sm font-medium">
                            Número de Série
                          </Label>
                          <Field as={Input} type="text" id="numeroSerie" name="numeroSerie" className="w-full" />
                          <ErrorMessage name="numeroSerie" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="imei" className="text-sm font-medium">
                            IMEI (para telefones e notebooks)
                          </Label>
                          <Field as={Input} type="text" id="imei" name="imei" className="w-full" />
                          <ErrorMessage name="imei" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </>
                    )}

                    {values.categoria === "veiculo" && (
                      <div>
                        <Label htmlFor="chassi" className="text-sm font-medium">
                          Chassi
                        </Label>
                        <Field as={Input} type="text" id="chassi" name="chassi" className="w-full" />
                        <ErrorMessage name="chassi" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="situacao" className="text-sm font-medium">
                        Situação
                      </Label>
                      <Select name="situacao" onValueChange={(value) => setFieldValue("situacao", value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a situação" />
                        </SelectTrigger>
                        <SelectContentStyled>
                          <SelectItem value="novo">Novo</SelectItem>
                          <SelectItem value="usado">Usado</SelectItem>
                          <SelectItem value="danificado">Danificado</SelectItem>
                        </SelectContentStyled>
                      </Select>
                      <ErrorMessage name="situacao" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="notaFiscal" className="text-sm font-medium">
                        Nota Fiscal (arquivo)
                      </Label>
                      <Input
                        type="file"
                        id="notaFiscal"
                        name="notaFiscal"
                        onChange={(event) => {
                          setFieldValue("notaFiscal", event.currentTarget.files?.[0])
                        }}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="imagens" className="text-sm font-medium">
                        Imagens
                      </Label>
                      <Input
                        type="file"
                        id="imagens"
                        name="imagens"
                        multiple
                        onChange={(event) => {
                          setFieldValue("imagens", event.currentTarget.files)
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
                  {isSubmitting ? "Cadastrando..." : "Cadastrar Objeto"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  )
}

export default CadastrarTab

